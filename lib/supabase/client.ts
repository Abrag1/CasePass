import { createBrowserClient } from "@supabase/ssr";

// Not passed a generated `Database` generic -- supabase-js's newest type-gen shape
// isn't hand-writable reliably. Query helpers in lib/queries/* cast results to the
// app-level interfaces in lib/supabase/types.ts instead.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
