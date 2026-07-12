type IconProps = { size?: number };

function base(children: React.ReactNode, size = 17) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      {children}
    </svg>
  );
}

export function HomeIcon({ size }: IconProps) {
  return base(
    <>
      <path d="M3 10.7 12 3l9 7.7" />
      <path d="M5.5 9.6V20h13V9.6" />
    </>,
    size
  );
}

export function CalendarPlusIcon({ size }: IconProps) {
  return base(
    <>
      <rect x="3.5" y="5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M8 2.5v4M16 2.5v4M12 12v5M9.5 14.5h5" />
    </>,
    size
  );
}

export function BookIcon({ size }: IconProps) {
  return base(
    <>
      <path d="M5 4.5h10.5a1.8 1.8 0 0 1 1.8 1.8V20H6.8A1.8 1.8 0 0 0 5 21.8z" />
      <path d="M5 19.5a1.8 1.8 0 0 1 1.8-1.8h10.5" />
    </>,
    size
  );
}

export function UserIcon({ size }: IconProps) {
  return base(
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5.5 20c0-3.3 3-5.4 6.5-5.4s6.5 2.1 6.5 5.4" />
    </>,
    size
  );
}

export function ClockIcon({ size }: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.5V12l3.2 2" />
    </>,
    size
  );
}

export function GearIcon({ size }: IconProps) {
  return base(
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </>,
    size
  );
}

export function ChevronLeftIcon({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 15 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}
