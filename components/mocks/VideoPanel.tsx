"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { meetingProvider, parseBuiltinMeeting } from "@/lib/meeting";

interface JitsiApi {
  dispose: () => void;
  addEventListener: (event: string, listener: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    JitsiMeetExternalAPI?: new (domain: string, options: Record<string, unknown>) => JitsiApi;
  }
}

// Floating-window sizes (video width in px; height follows 16:9).
const FLOAT_WIDTHS = [280, 360, 480] as const;
const FLOAT_CHROME = 64; // header + padding around the video, for clamping
const MARGIN = 12;

/** The nearest ancestor that actually scrolls (the app shell scrolls <main>, not the window). */
function scrollParent(el: HTMLElement | null): HTMLElement | null {
  for (let p = el?.parentElement ?? null; p; p = p.parentElement) {
    const oy = getComputedStyle(p).overflowY;
    if ((oy === "auto" || oy === "scroll" || oy === "overlay") && p.scrollHeight > p.clientHeight) return p;
  }
  return null;
}

export function VideoPanel({
  meetingLink,
  displayName,
  subject,
}: {
  meetingLink: string | null;
  displayName: string;
  subject?: string;
}) {
  const provider = meetingProvider(meetingLink);
  const [joined, setJoined] = useState(false);

  // The call can float as a small window you can drag anywhere, so the other person
  // stays in view while you scroll to the notes. It floats automatically when the
  // panel scrolls out of view, or on demand with "Float". The video lives in the same
  // DOM node either way, so the call is never torn down or reloaded.
  const slotRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [slotHeight, setSlotHeight] = useState<number | null>(null);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [manualFloat, setManualFloat] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null); // null = bottom-right
  const [sizeIdx, setSizeIdx] = useState(1);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const floating = joined && (scrolledPast || manualFloat);
  const width = FLOAT_WIDTHS[sizeIdx];

  // Watch scroll on whatever scroller holds the panel (capture catches any container).
  useEffect(() => {
    const slot = slotRef.current;
    if (!slot || !joined) return;
    const scroller = scrollParent(slot);
    const check = () => {
      const r = slot.getBoundingClientRect();
      const top = scroller ? scroller.getBoundingClientRect().top : 0;
      const past = r.bottom < top + 24;
      if (!past) setSlotHeight(r.height);
      setScrolledPast(past);
    };
    check();
    document.addEventListener("scroll", check, { capture: true, passive: true });
    window.addEventListener("resize", check);
    return () => {
      document.removeEventListener("scroll", check, { capture: true });
      window.removeEventListener("resize", check);
      setScrolledPast(false);
    };
  }, [joined]);

  // Keep a dragged window on-screen if the browser is resized or the size changes.
  const clamp = useCallback(
    (x: number, y: number) => ({
      x: Math.min(Math.max(MARGIN, x), Math.max(MARGIN, window.innerWidth - width - MARGIN - 16)),
      y: Math.min(Math.max(MARGIN, y), Math.max(MARGIN, window.innerHeight - (width * 9) / 16 - FLOAT_CHROME - MARGIN)),
    }),
    [width],
  );
  useEffect(() => {
    if (!floating) return;
    const onResize = () => setPos((p) => (p ? clamp(p.x, p.y) : p));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [floating, clamp]);

  function startFloat() {
    const slot = slotRef.current;
    if (slot) setSlotHeight(slot.getBoundingClientRect().height);
    setManualFloat(true);
  }

  function onDragStart(e: React.PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button, a")) return; // header buttons stay clickable
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    drag.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  }
  function onDragMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    setPos(clamp(e.clientX - drag.current.dx, e.clientY - drag.current.dy));
  }
  function onDragEnd(e: React.PointerEvent<HTMLDivElement>) {
    drag.current = null;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
  }

  if (provider.kind === "none") return null;

  const headerBtn = "text-[12px] font-semibold text-[#7fd1a3] hover:text-[#9fe0bd] cursor-pointer whitespace-nowrap";

  return (
    <div ref={slotRef} className="mb-4" style={floating && slotHeight ? { height: slotHeight } : undefined}>
      <div
        ref={cardRef}
        className={
          floating
            ? "fixed z-50 bg-[#10130e] rounded-xl p-2 shadow-[0_10px_34px_rgba(0,0,0,.4)] ring-1 ring-white/10"
            : "bg-[#10130e] rounded-xl p-3 shadow-[0_6px_22px_rgba(0,0,0,.14)]"
        }
        style={
          floating
            ? { width, maxWidth: "calc(100vw - 24px)", ...(pos ? { left: pos.x, top: pos.y } : { right: 16, bottom: 16 }) }
            : undefined
        }
      >
        <div
          className={`flex items-center justify-between gap-3 px-0.5 ${floating ? "mb-1.5 cursor-grab active:cursor-grabbing select-none touch-none" : "mb-2.5 flex-wrap"}`}
          onPointerDown={floating ? onDragStart : undefined}
          onPointerMove={floating ? onDragMove : undefined}
          onPointerUp={floating ? onDragEnd : undefined}
          onPointerCancel={floating ? onDragEnd : undefined}
          title={floating ? "Drag to move" : undefined}
        >
          <span className="text-[12px] font-semibold text-[#cfe3d7] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#42c97a] shadow-[0_0_0_3px_rgba(66,201,122,.2)]" />
            {floating ? "⠿ Video call" : `Video call · ${provider.label}`}
          </span>
          <span className="flex items-center gap-3">
            {floating ? (
              <>
                <button
                  onClick={() => setSizeIdx((i) => (i + 1) % FLOAT_WIDTHS.length)}
                  className={headerBtn}
                  title="Change size"
                >
                  Size
                </button>
                {scrolledPast ? (
                  <button
                    onClick={() => slotRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
                    className={headerBtn}
                  >
                    Back ↑
                  </button>
                ) : (
                  <button onClick={() => setManualFloat(false)} className={headerBtn}>
                    Dock
                  </button>
                )}
              </>
            ) : (
              <>
                {joined && (
                  <button onClick={startFloat} className={headerBtn} title="Pop the video out so you can move it anywhere">
                    Float ⇱
                  </button>
                )}
                {meetingLink && (
                  <a href={meetingLink} target="_blank" rel="noopener noreferrer" className={headerBtn}>
                    Open in new tab ↗
                  </a>
                )}
              </>
            )}
          </span>
        </div>

        {provider.kind === "external" ? (
          <div className="flex items-center justify-between gap-4 bg-[#1c211a] rounded-lg px-4 py-4 flex-wrap">
            <p className="text-[13px] text-[#c4cdc7] leading-relaxed max-w-md">
              This mock runs on {provider.label} — open the call there, then keep this page up for the
              case, exhibits, and notes.
            </p>
            <a
              href={meetingLink!}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-(--color-green) hover:bg-(--color-green-dark) text-white px-4 py-2.5 text-sm font-semibold whitespace-nowrap"
            >
              Join on {provider.label} ↗
            </a>
          </div>
        ) : !joined ? (
          <div className="flex items-center justify-between gap-4 bg-[#1c211a] rounded-lg px-4 py-4 flex-wrap">
            <p className="text-[13px] text-[#c4cdc7] leading-relaxed max-w-md">
              Your private video room is ready — it opens right here, next to the case. Your browser
              will ask for camera &amp; mic access when you join.
            </p>
            <button
              onClick={() => setJoined(true)}
              className="rounded-lg bg-(--color-green) hover:bg-(--color-green-dark) text-white px-4 py-2.5 text-sm font-semibold cursor-pointer whitespace-nowrap"
            >
              Join video call
            </button>
          </div>
        ) : (
          <div>
            <JitsiEmbed
              meetingLink={meetingLink!}
              displayName={displayName}
              subject={subject}
              height={floating ? Math.round((width * 9) / 16) : 380}
            />
            {!floating && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => {
                    setManualFloat(false);
                    setJoined(false);
                  }}
                  className="text-[12px] font-semibold text-[#8a958d] hover:text-[#c4cdc7] cursor-pointer"
                >
                  Close video panel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function JitsiEmbed({
  meetingLink,
  displayName,
  subject,
  height,
}: {
  meetingLink: string;
  displayName: string;
  subject?: string;
  height: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);
  // Bumped by "Rejoin" to tear the embed down and bring it back up in the same room.
  const [attempt, setAttempt] = useState(0);
  const [left, setLeft] = useState(false);

  useEffect(() => {
    const meeting = parseBuiltinMeeting(meetingLink);
    if (!meeting || !containerRef.current) return;

    let api: JitsiApi | undefined;
    let cancelled = false;

    function init() {
      if (cancelled || !containerRef.current || !window.JitsiMeetExternalAPI) return;
      containerRef.current.innerHTML = "";
      api = new window.JitsiMeetExternalAPI(meeting!.domain, {
        roomName: meeting!.room,
        parentNode: containerRef.current,
        width: "100%",
        height: "100%",
        userInfo: { displayName },
        configOverwrite: {
          prejoinConfig: { enabled: false },
          disableDeepLinking: true,
          ...(subject ? { subject } : {}),
        },
      });
      api.addEventListener("videoConferenceJoined", () => {
        console.log("[casepass] video conference joined");
        if (!cancelled) setLeft(false);
      });
      // The call ended on this side (hang-up, or the connection gave out for good):
      // offer a one-click rejoin instead of leaving a dead panel.
      const onLeft = () => {
        console.log("[casepass] video conference left");
        if (!cancelled) setLeft(true);
      };
      api.addEventListener("videoConferenceLeft", onLeft);
      api.addEventListener("readyToClose", onLeft);
    }

    // The external_api.js script is domain-specific; load it from the room's own host.
    if (window.JitsiMeetExternalAPI) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = `https://${meeting.domain}/external_api.js`;
      script.onload = init;
      script.onerror = () => setError(true);
      document.head.appendChild(script);
    }

    return () => {
      cancelled = true;
      api?.dispose();
    };
  }, [meetingLink, displayName, subject, attempt]);

  // If the browser itself goes offline then comes back, the embedded call usually
  // doesn't recover on its own -- surface the rejoin prompt.
  useEffect(() => {
    const onOffline = () => setLeft(true);
    window.addEventListener("offline", onOffline);
    return () => window.removeEventListener("offline", onOffline);
  }, []);

  if (error) {
    return (
      <div className="h-[120px] flex items-center justify-center text-[13px] text-[#c4cdc7]">
        Couldn&apos;t load the video widget —{" "}
        <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="text-[#7fd1a3] font-semibold ml-1">
          open the call in a new tab ↗
        </a>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={containerRef} className="rounded-lg overflow-hidden bg-black" style={{ height }} />
      {left && (
        <div className="absolute inset-0 rounded-lg bg-[#10130e]/90 flex flex-col items-center justify-center gap-2 text-center px-3">
          <div className="text-[13px] font-semibold text-[#e6efe9]">Call disconnected</div>
          <button
            onClick={() => {
              setLeft(false);
              setAttempt((n) => n + 1);
            }}
            className="rounded-lg bg-(--color-green) hover:bg-(--color-green-dark) text-white px-4 py-2 text-sm font-semibold cursor-pointer"
          >
            Rejoin call
          </button>
        </div>
      )}
    </div>
  );
}
