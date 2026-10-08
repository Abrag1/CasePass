"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  emptySection,
  parseState,
  sectionSeconds,
  serializeState,
  type InterviewState,
} from "@/lib/interview/model";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface Options {
  /** Initial serialized state (parsed defensively). */
  initial: string | null | undefined;
  /** Persist the serialized state somewhere. Resolve true on success. */
  persist: (serialized: string) => Promise<boolean> | boolean;
  /** Re-read on mount from a local source (e.g. localStorage); wins over `initial` when it returns a value. */
  readLocal?: () => string | null;
}

/**
 * Independent notes + stopwatch per section. Notes autosave (debounced); timer
 * start/stop saves immediately. `savedAt[key]` records when each section's notes
 * last reached storage, which is what the "Saved ✓" badge shows.
 */
export function useInterviewState({ initial, persist, readLocal }: Options) {
  const [state, setState] = useState<InterviewState>(() => parseState(initial));
  const [now, setNow] = useState(() => Date.now());
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [savedAt, setSavedAt] = useState<Record<string, number>>({});
  const [dirty, setDirty] = useState<Record<string, true>>({});

  const stateRef = useRef(state);
  const dirtyRef = useRef<Record<string, true>>({});
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const persistRef = useRef(persist);
  useEffect(() => {
    persistRef.current = persist;
  });

  // Hydrate from a client-only store after mount (localStorage is unavailable on the server).
  useEffect(() => {
    if (!readLocal) return;
    const raw = readLocal();
    if (raw) {
      const parsed = parseState(raw);
      stateRef.current = parsed;
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState(parsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const anyRunning = useMemo(() => Object.values(state.sections).some((s) => s.runningSince), [state]);
  useEffect(() => {
    if (!anyRunning) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [anyRunning]);

  const flush = useCallback(async () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    const keys = Object.keys(dirtyRef.current);
    setStatus("saving");
    let ok = false;
    try {
      ok = await persistRef.current(serializeState(stateRef.current));
    } catch {
      ok = false;
    }
    if (ok) {
      const at = Date.now();
      setSavedAt((prev) => {
        const next = { ...prev };
        for (const k of keys) next[k] = at;
        next["__all"] = at;
        return next;
      });
      for (const k of keys) delete dirtyRef.current[k];
      setDirty({ ...dirtyRef.current });
      setStatus("saved");
    } else {
      setStatus("error");
    }
  }, []);

  const commit = useCallback(
    (updater: (s: InterviewState) => InterviewState, touched: string[], immediate: boolean) => {
      const next = updater(stateRef.current);
      stateRef.current = next;
      setState(next);
      for (const k of touched) dirtyRef.current[k] = true;
      setDirty({ ...dirtyRef.current });
      setStatus("saving");
      if (timer.current) clearTimeout(timer.current);
      if (immediate) void flush();
      else timer.current = setTimeout(() => void flush(), 600);
    },
    [flush],
  );

  // Flush a pending debounced save if the page is left.
  useEffect(() => {
    const onHide = () => {
      if (timer.current) void flush();
    };
    window.addEventListener("pagehide", onHide);
    return () => {
      window.removeEventListener("pagehide", onHide);
      if (timer.current) void flush();
    };
  }, [flush]);

  const setNotes = useCallback(
    (key: string, notes: string) =>
      commit(
        (s) => ({ ...s, sections: { ...s.sections, [key]: { ...(s.sections[key] ?? emptySection()), notes } } }),
        [key],
        false,
      ),
    [commit],
  );

  const appendNote = useCallback(
    (key: string, line: string) =>
      commit(
        (s) => {
          const cur = s.sections[key] ?? emptySection();
          const sep = cur.notes && !cur.notes.endsWith("\n") ? "\n" : "";
          return { ...s, sections: { ...s.sections, [key]: { ...cur, notes: `${cur.notes}${sep}• ${line}\n` } } };
        },
        [key],
        true,
      ),
    [commit],
  );

  const setGeneral = useCallback(
    (general: string) => commit((s) => ({ ...s, general }), ["general"], false),
    [commit],
  );

  /** Stop every running timer except `exceptKey`, banking elapsed seconds. */
  const bank = (s: InterviewState, at: number, exceptKey?: string): InterviewState => {
    const sections = { ...s.sections };
    for (const [k, sec] of Object.entries(sections)) {
      if (sec.runningSince && k !== exceptKey) {
        sections[k] = { ...sec, seconds: sectionSeconds(sec, at), runningSince: null };
      }
    }
    return { ...s, sections };
  };

  /** Start this section's timer (any other running timer is stopped first). */
  const startTimer = useCallback(
    (key: string) => {
      const at = Date.now();
      setNow(at);
      commit(
        (s) => {
          const b = bank(s, at, key);
          const cur = b.sections[key] ?? emptySection();
          if (cur.runningSince) return { ...b, clock: "running" };
          return { ...b, clock: "running", sections: { ...b.sections, [key]: { ...cur, runningSince: at } } };
        },
        [key],
        true,
      );
    },
    [commit],
  );

  const stopTimer = useCallback(
    (key: string) => {
      const at = Date.now();
      commit(
        (s) => {
          const cur = s.sections[key];
          if (!cur?.runningSince) return s;
          return { ...s, clock: "paused", sections: { ...s.sections, [key]: { ...cur, seconds: sectionSeconds(cur, at), runningSince: null } } };
        },
        [key],
        true,
      );
    },
    [commit],
  );

  const resetTimer = useCallback(
    (key: string) =>
      commit(
        (s) => ({ ...s, sections: { ...s.sections, [key]: { ...(s.sections[key] ?? emptySection()), seconds: 0, runningSince: null } } }),
        [key],
        true,
      ),
    [commit],
  );

  /**
   * Move from one section to another. Once the interview is underway (running or
   * paused) the section you leave records its time and the next one starts
   * automatically; a section you have not timed before starts from 00:00.
   */
  const advance = useCallback(
    (fromKey: string | undefined, toKey: string) => {
      const clock = stateRef.current.clock;
      if (clock !== "running" && clock !== "paused") return;
      const at = Date.now();
      setNow(at);
      commit(
        (s) => {
          const b = bank(s, at);
          const cur = b.sections[toKey] ?? emptySection();
          return { ...b, clock: "running", sections: { ...b.sections, [toKey]: { ...cur, runningSince: at } } };
        },
        fromKey ? [fromKey, toKey] : [toKey],
        true,
      );
    },
    [commit],
  );

  const stopAll = useCallback(() => {
    const at = Date.now();
    commit((s) => ({ ...bank(s, at), clock: "ended" }), Object.keys(stateRef.current.sections), true);
  }, [commit]);

  const reset = useCallback(() => {
    commit(() => parseState(null), ["__all"], true);
  }, [commit]);

  const secondsFor = useCallback((key: string) => sectionSeconds(state.sections[key], now), [state, now]);
  const runningKey = useMemo(
    () => Object.entries(state.sections).find(([, s]) => s.runningSince)?.[0] ?? null,
    [state],
  );

  return {
    state,
    now,
    status,
    savedAt,
    dirty,
    runningKey,
    clock: state.clock,
    secondsFor,
    setNotes,
    appendNote,
    setGeneral,
    startTimer,
    stopTimer,
    resetTimer,
    advance,
    stopAll,
    reset,
    flush,
  };
}

export type InterviewApi = ReturnType<typeof useInterviewState>;
