export function Logo({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="5" y="6" width="38" height="36" rx="4" stroke="#15294d" strokeWidth="2.6" />
      <path d="M5 14h38" stroke="#15294d" strokeWidth="2.6" />
      <path d="M22 14v28" stroke="#15294d" strokeWidth="2.6" />
      <path d="M9.5 20h6" stroke="#15294d" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9.5 25h6" stroke="#15294d" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M9.5 30h6" stroke="#15294d" strokeWidth="2.4" strokeLinecap="round" />
      <path
        d="M9.8 35.6l2 2 3.4-3.8"
        stroke="#2d6a4f"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M31 14h7v11l-3.5-3-3.5 3z" fill="#2d6a4f" />
    </svg>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[23px] font-bold tracking-tight leading-none ${className}`}>
      <span style={{ color: "#15294d" }}>Case</span>
      <span style={{ color: "#2d6a4f" }}>Pass</span>
    </span>
  );
}
