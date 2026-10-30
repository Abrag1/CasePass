"use client";

import { useEffect, useRef, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Presented } from "@/lib/supabase/types";
import type { RealtimeChannel } from "@supabase/supabase-js";

export interface MockSessionRealtimeUpdate {
  presented: Presented;
  presented_updated_at: string | null;
  synopsis_shared_live: boolean;
  timer_started_at: string | null;
  ended_at: string | null;
  status: string;
}

export type RealtimeStatus = "connecting" | "live" | "reconnecting";

const STATE_COLUMNS = "presented, presented_updated_at, synopsis_shared_live, timer_started_at, ended_at, status";
const POLL_MS = 3000;

// Keeps a Live Mock screen in sync with this one mock_sessions row.
//
// Primary path: Postgres Changes over the realtime socket. RLS restricts delivery
// to the session's two participants -- which is exactly why the socket MUST carry
// the user's JWT (setAuth below). Without it the socket is anonymous: the channel
// still reports SUBSCRIBED, but RLS silently filters out every event and nothing
// ever arrives.
//
// A realtime event is fire-and-forget: if the socket drops (Wi-Fi blip, sleeping
// tab, expired token) the missed UPDATE is gone and the screen is stale with no
// error. So we also re-read the row (a) whenever the channel (re)subscribes,
// (b) when the tab becomes visible / regains focus / the browser comes back
// online, and (c) with `poll`, every few seconds as a safety net. Pass `poll` for
// the side that only receives (the interviewee); the interviewer is the writer, so
// a poll could only clobber their optimistic state.
export function useMockSessionRealtime(
  sessionId: string,
  onUpdate: (row: MockSessionRealtimeUpdate) => void,
  opts: { poll?: boolean } = {},
): RealtimeStatus {
  const [status, setStatus] = useState<RealtimeStatus>("connecting");
  const onUpdateRef = useRef(onUpdate);
  useEffect(() => {
    onUpdateRef.current = onUpdate;
  });
  const poll = !!opts.poll;

  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | undefined;
    let cancelled = false;
    let timer: ReturnType<typeof setInterval> | undefined;

    async function refresh() {
      if (cancelled) return;
      const { data } = await supabase.from("mock_sessions").select(STATE_COLUMNS).eq("id", sessionId).maybeSingle();
      if (data && !cancelled) onUpdateRef.current(data as MockSessionRealtimeUpdate);
    }

    const onWake = () => {
      if (document.visibilityState === "visible") refresh();
    };

    (async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) await supabase.realtime.setAuth(session.access_token);
      if (cancelled) return;

      channel = supabase
        .channel(`mock:${sessionId}`)
        .on(
          "postgres_changes",
          { event: "UPDATE", schema: "public", table: "mock_sessions", filter: `id=eq.${sessionId}` },
          (payload) => {
            onUpdateRef.current(payload.new as MockSessionRealtimeUpdate);
          }
        )
        .subscribe((s, err) => {
          console.log("[casepass] realtime channel status:", s, err ? String(err) : "");
          if (cancelled) return;
          if (s === "SUBSCRIBED") {
            setStatus("live");
            refresh(); // catch up on anything missed while (re)connecting
          } else if (s === "CHANNEL_ERROR" || s === "TIMED_OUT" || s === "CLOSED") {
            setStatus("reconnecting"); // supabase-js retries on its own
          }
        });
    })();

    // Keep the socket's JWT fresh -- an expired token silently stops delivery.
    const { data: authSub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) supabase.realtime.setAuth(session.access_token);
    });

    document.addEventListener("visibilitychange", onWake);
    window.addEventListener("focus", onWake);
    window.addEventListener("online", onWake);
    if (poll) timer = setInterval(onWake, POLL_MS);

    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
      document.removeEventListener("visibilitychange", onWake);
      window.removeEventListener("focus", onWake);
      window.removeEventListener("online", onWake);
      authSub.subscription.unsubscribe();
      if (channel) supabase.removeChannel(channel);
    };
  }, [sessionId, poll]);

  return status;
}

// Who is actually on the Live Mock page right now, and what is on their screen.
// The interviewee reports the page index they are rendering; the interviewer reads
// it back to confirm a share really landed. Presence is tracked per tab, keyed by
// role, so it disappears on its own when the tab closes or the socket drops.
export function useMockPresence(
  sessionId: string,
  role: "interviewer" | "interviewee",
  seen: number | null,
): { partnerOnline: boolean; partnerSeen: number | null } {
  const [partner, setPartner] = useState<{ online: boolean; seen: number | null }>({ online: false, seen: null });
  const channelRef = useRef<RealtimeChannel | null>(null);
  const seenRef = useRef(seen);
  useEffect(() => {
    seenRef.current = seen;
  });
  const partnerRole = role === "interviewer" ? "interviewee" : "interviewer";

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase.channel(`presence:${sessionId}`, { config: { presence: { key: role } } });
    channelRef.current = channel;

    const sync = () => {
      const metas = channel.presenceState<{ seen: number | null }>()[partnerRole];
      const latest = metas?.[metas.length - 1];
      setPartner(latest ? { online: true, seen: latest.seen ?? null } : { online: false, seen: null });
    };

    channel
      .on("presence", { event: "sync" }, sync)
      .subscribe((s) => {
        if (s === "SUBSCRIBED") channel.track({ seen: seenRef.current });
      });

    return () => {
      channelRef.current = null;
      supabase.removeChannel(channel);
    };
  }, [sessionId, role, partnerRole]);

  // Re-announce whenever what's on this person's screen changes.
  useEffect(() => {
    const ch = channelRef.current;
    if (ch && ch.state === "joined") ch.track({ seen });
  }, [seen]);

  return { partnerOnline: partner.online, partnerSeen: partner.seen };
}
