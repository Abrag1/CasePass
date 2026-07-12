import { type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from "react";

const inputClass =
  "w-full rounded-lg border border-(--color-border) bg-white px-3 py-2.5 text-sm text-(--color-fg) placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-(--color-green)/30 focus:border-(--color-green)";

export function Label({ children }: { children: ReactNode }) {
  return (
    <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-(--color-muted)">
      {children}
    </div>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${inputClass} resize-none ${props.className ?? ""}`} />;
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${inputClass} ${props.className ?? ""}`} />;
}

export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-sm text-[#8a4a3f] bg-[#fbf4f2] border border-[#e4d3cf] rounded-lg px-3 py-2">{message}</p>;
}
