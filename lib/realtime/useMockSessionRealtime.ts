"use client";

import { useEffect } from "react";
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

// Subscribes to Postgres Changes on this one mock_sessions row. RLS restricts
// delivery to the session's two participants -- which is exactly why the realtime
// socket MUST carry the user's JWT (setAuth below). Without it the socket is
// anonymous: the channel still reports SUBSCRIBED, but RLS silently filters out
// every event and nothing ever arrives.
export function useMockSessionRealtime(sessionId: string, onUpdate: (row: MockSessionRealtimeUpdate) => void) {
  useEffect(() => {
    const supabase = createClient();
    let channel: RealtimeChannel | undefined;
    let cancelled = false;

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
            onUpdate(payload.new as MockSessionRealtimeUpdate);
          }
        )
        .subscribe((status, err) => {
          console.log("[casepass] realtime channel status:", status, err ? String(err) : "");
        });
    })();

    return () => {
      cancelled = true;
      if (channel) supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId]);
}
