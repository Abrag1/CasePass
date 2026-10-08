"use client";

// In-person / screen-share presenter mode.
//
// Wrap a page in <PresenterScope>, then wrap any block in <Presentable>. Clicking
// "Present" takes just that block fullscreen (nothing else from the page), sized
// for someone sitting across the table. Esc / "Exit" drops straight back to the
// page the interviewer was on. ←/→ walk through the other presentable blocks in
// page order, so a feedback walkthrough (structure → exhibit → answer) is one
// continuous flow.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface Entry {
  el: HTMLElement | null;
  title: string;
  label: string;
  view: ReactNode;
}

interface Ctx {
  register: (id: string, entry: Entry) => void;
  unregister: (id: string) => void;
  open: (id: string) => void;
  /** Present arbitrary content that isn't an inline block (e.g. a feedback summary). */
  openAdHoc: (title: string, node: ReactNode) => void;
}

const PresenterContext = createContext<Ctx | null>(null);

export function usePresenter() {
  return useContext(PresenterContext);
}

interface DeckItem {
  id: string;
  title: string;
  label: string;
  view: ReactNode;
}

// The deck is snapshotted when Present is clicked (in the click handler, where
// reading the registry is allowed), so ←/→ walk blocks in page order.
type Active = { kind: "deck"; items: DeckItem[]; index: number } | { kind: "adhoc"; title: string; node: ReactNode } | null;

export function PresenterScope({ children }: { children: ReactNode }) {
  const registry = useRef(new Map<string, Entry>());
  const [active, setActive] = useState<Active>(null);
  const [zoom, setZoom] = useState(1.25);

  const register = useCallback((id: string, entry: Entry) => {
    registry.current.set(id, entry);
  }, []);
  const unregister = useCallback((id: string) => {
    registry.current.delete(id);
  }, []);

  // Must run inside the click handler so the browser accepts the fullscreen request.
  const goFullscreen = useCallback(() => {
    const el = document.documentElement;
    if (!document.fullscreenElement && el.requestFullscreen) {
      el.requestFullscreen().catch(() => {
        // Denied (iframe, older browser): the fixed overlay still fills the window.
      });
    }
  }, []);

  const open = useCallback(
    (id: string) => {
      goFullscreen();
      const items: DeckItem[] = [...registry.current.entries()]
        .filter(([, e]) => e.el && e.el.isConnected)
        .sort(([, a], [, b]) => (a.el!.compareDocumentPosition(b.el!) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1))
        .map(([key, e]) => ({ id: key, title: e.title, label: e.label, view: e.view }));
      const index = Math.max(0, items.findIndex((i) => i.id === id));
      setActive({ kind: "deck", items, index });
    },
    [goFullscreen],
  );
  const openAdHoc = useCallback(
    (title: string, node: ReactNode) => {
      goFullscreen();
      setActive({ kind: "adhoc", title, node });
    },
    [goFullscreen],
  );

  const close = useCallback(() => {
    setActive(null);
    if (document.fullscreenElement && document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  const step = useCallback((dir: 1 | -1) => {
    setActive((cur) => {
      if (!cur || cur.kind !== "deck") return cur;
      const index = cur.index + dir;
      return index < 0 || index >= cur.items.length ? cur : { ...cur, index };
    });
  }, []);

  // Esc inside fullscreen is eaten by the browser and surfaces as fullscreenchange;
  // when fullscreen isn't available, handle Esc ourselves. Either way: back to the
  // interviewer's page with one keypress.
  useEffect(() => {
    if (!active) return;
    let sawFullscreen = !!document.fullscreenElement;
    const onFs = () => {
      if (document.fullscreenElement) sawFullscreen = true;
      else if (sawFullscreen) setActive(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "+" || e.key === "=") setZoom((z) => Math.min(2.2, +(z + 0.15).toFixed(2)));
      else if (e.key === "-") setZoom((z) => Math.max(0.8, +(z - 0.15).toFixed(2)));
    };
    document.addEventListener("fullscreenchange", onFs);
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("fullscreenchange", onFs);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close, step]);

  const ctx = useMemo<Ctx>(() => ({ register, unregister, open, openAdHoc }), [register, unregister, open, openAdHoc]);

  let overlay: ReactNode = null;
  if (active) {
    const item = active.kind === "deck" ? active.items[active.index] : null;
    const total = active.kind === "deck" ? active.items.length : 0;
    overlay = (
      <PresenterOverlay
        title={active.kind === "adhoc" ? active.title : (item?.title ?? "")}
        label={active.kind === "adhoc" ? "Summary" : (item?.label ?? "")}
        position={active.kind === "deck" && total > 1 ? `${active.index + 1} / ${total}` : null}
        canPrev={active.kind === "deck" && active.index > 0}
        canNext={active.kind === "deck" && active.index < total - 1}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
        onExit={close}
        zoom={zoom}
        onZoom={(d) => setZoom((z) => Math.min(2.2, Math.max(0.8, +(z + d).toFixed(2))))}
      >
        {active.kind === "adhoc" ? active.node : item?.view}
      </PresenterOverlay>
    );
  }

  return (
    <PresenterContext.Provider value={ctx}>
      {children}
      {overlay}
    </PresenterContext.Provider>
  );
}

function PresenterOverlay({
  title,
  label,
  position,
  canPrev,
  canNext,
  onPrev,
  onNext,
  onExit,
  zoom,
  onZoom,
  children,
}: {
  title: string;
  label: string;
  position: string | null;
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  zoom: number;
  onZoom: (delta: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollTo({ top: 0 });
  }, [title, label]);

  const barBtn =
    "rounded-md border border-[#d7d9d4] bg-white px-2.5 py-1.5 text-[12px] font-semibold text-[#3a3f3b] cursor-pointer disabled:opacity-30 disabled:cursor-default";

  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Presenting: ${title}`}
      className="fixed inset-0 z-[1000] overflow-y-auto outline-none"
      style={{ background: "#f7f7f4" }}
    >
      {/* Quiet control bar: fades back until hovered so the interviewee sees the content, not the chrome. */}
      <div
        className="fixed top-0 inset-x-0 z-10 flex items-center justify-between gap-3 px-4 py-2.5 transition-opacity opacity-40 hover:opacity-100 focus-within:opacity-100"
        style={{ background: "rgba(247,247,244,.92)", borderBottom: "1px solid #e6e7e3" }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button onClick={onExit} className={barBtn} style={{ background: "#2d6a4f", color: "#fff", borderColor: "#2d6a4f" }}>
            ✕ Exit presenter <span style={{ opacity: 0.7, fontWeight: 500 }}>(Esc)</span>
          </button>
          {position && (
            <>
              <button onClick={onPrev} disabled={!canPrev} className={barBtn} aria-label="Previous">
                ←
              </button>
              <span className="text-[12px] text-[#8a8f8a] tabular-nums">{position}</span>
              <button onClick={onNext} disabled={!canNext} className={barBtn} aria-label="Next">
                →
              </button>
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <button onClick={() => onZoom(-0.15)} className={barBtn} aria-label="Smaller">
            A−
          </button>
          <button onClick={() => onZoom(0.15)} className={barBtn} aria-label="Larger">
            A+
          </button>
        </div>
      </div>

      <div className="mx-auto px-6 pt-20 pb-16" style={{ maxWidth: 1080 }}>
        {label && (
          <div className="text-[12px] uppercase tracking-widest font-semibold text-[#8a8f8a] mb-1" style={{ zoom }}>
            {label}
          </div>
        )}
        <div className="font-serif font-semibold text-[#1f2421] mb-5" style={{ zoom, fontSize: 24 }}>
          {title}
        </div>
        <div style={{ zoom }}>{children}</div>
      </div>
    </div>
  );
}

/** Small "Present" trigger icon + label. */
export function PresentIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

/**
 * Wraps one block of case content with a Present button. `label` says what kind
 * of block it is ("Exhibit", "Answer", …); `view` optionally overrides what shows
 * fullscreen (defaults to the block itself).
 */
export interface ShareControl {
  /** e.g. "Emily" */
  firstName: string;
  onScreen: boolean;
  onShare: () => void;
}

export function Presentable({
  title,
  label,
  view,
  share,
  children,
}: {
  title: string;
  label: string;
  view?: ReactNode;
  /** Live Mock only: also offer "Share with <name>" (puts this on the interviewee's screen). */
  share?: ShareControl;
  children: ReactNode;
}) {
  const ctx = usePresenter();
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctx) return;
    ctx.register(id, { el: ref.current, title, label, view: view ?? children });
  });
  useEffect(() => {
    if (!ctx) return;
    return () => ctx.unregister(id);
  }, [ctx, id]);

  if (!ctx) return <>{children}</>;

  return (
    <div ref={ref} className="relative group/present" data-presentable>
      {children}
      <div className="absolute top-2 right-2 z-[1] flex items-center gap-1.5">
        {share && (
          <button
            type="button"
            onClick={share.onShare}
            title={`Put this on ${share.firstName}’s Live Mock screen`}
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold cursor-pointer shadow-sm"
            style={
              share.onScreen
                ? { background: "#2d6a4f", color: "#fff", borderColor: "#2d6a4f" }
                : { background: "rgba(255,255,255,.95)", color: "#15294d", borderColor: "#cdd6e4" }
            }
          >
            {share.onScreen ? `Shared with ${share.firstName} ✓` : `Share with ${share.firstName}`}
          </button>
        )}
        <button
          type="button"
          onClick={() => ctx.open(id)}
          title={`Present “${label}” fullscreen on your screen — Esc to come back`}
          className="inline-flex items-center gap-1 rounded-md border border-[#cfe3d7] bg-white/95 px-2 py-1 text-[11px] font-semibold text-(--color-green) cursor-pointer shadow-sm hover:bg-[#e9f1ec]"
        >
          <PresentIcon /> Present
        </button>
      </div>
    </div>
  );
}

/** Standalone button for content that isn't an inline block. */
export function PresentContentButton({
  title,
  content,
  className = "",
  children = "Present",
}: {
  title: string;
  content: ReactNode;
  className?: string;
  children?: ReactNode;
}) {
  const ctx = usePresenter();
  if (!ctx) return null;
  return (
    <button
      type="button"
      onClick={() => ctx.openAdHoc(title, content)}
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#cfe3d7] bg-[#e9f1ec] px-3 py-2 text-[13px] font-semibold text-(--color-green) cursor-pointer hover:bg-[#dcebe2] ${className}`}
    >
      <PresentIcon /> {children}
    </button>
  );
}
