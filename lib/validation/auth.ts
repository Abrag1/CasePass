import { z } from "zod";

export const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name"),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Emails on these domains can create an account without an invite link.
export const OPEN_SIGNUP_DOMAINS = ["cornell.edu"];

export function isOpenSignupEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return OPEN_SIGNUP_DOMAINS.some((d) => domain === d || domain.endsWith(`.${d}`));
}

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Enter your password"),
});

// Where to send someone after they log in / sign up. Only same-site paths are
// honored, so a crafted ?next=https://evil.example can't turn login into an open redirect.
export function safeNext(raw: unknown, fallback = "/home"): string {
  if (typeof raw !== "string") return fallback;
  if (!raw.startsWith("/") || raw.startsWith("//") || raw.startsWith("/\\")) return fallback;
  if (/^\/(login|signup)(\/|\?|$)/.test(raw)) return fallback;
  return raw;
}
