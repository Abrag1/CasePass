"use client";

import { useEffect, useRef, useState } from "react";
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

  if (provider.kind === "none") return null;

  return (
    <div className="bg-[#10130e] rounded-xl p-3 mb-4 shadow-[0_6px_22px_rgba(0,0,0,.14)]">
      <div className="flex items-center justify-between gap-3 mb-2.5 px-0.5 flex-wrap">
        <span className="text-[12px] font-semibold text-[#cfe3d7] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#42c97a] shadow-[0_0_0_3px_rgba(66,201,122,.2)]" />
          Video call · {provider.label}
        </span>
        {meetingLink && (
          <a
            href={meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[12px] font-semibold text-[#7fd1a3] hover:text-[#9fe0bd]"
          >
            Open in new tab ↗
          </a>
        )}
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
          <JitsiEmbed meetingLink={meetingLink!} displayName={displayName} subject={subject} />
          <div className="flex justify-end mt-2">
            <button
              onClick={() => setJoined(false)}
              className="text-[12px] font-semibold text-[#8a958d] hover:text-[#c4cdc7] cursor-pointer"
            >
              Close video panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function JitsiEmbed({
  meetingLink,
  displayName,
  subject,
}: {
  meetingLink: string;
  displayName: string;
  subject?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState(false);

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
      });
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
  }, [meetingLink, displayName, subject]);

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

  return <div ref={containerRef} className="h-[380px] rounded-lg overflow-hidden bg-black" />;
}
