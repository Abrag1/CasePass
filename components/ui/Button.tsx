import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const variants: Record<Variant, string> = {
  primary:
    "bg-(--color-green) text-white hover:bg-(--color-green-dark) disabled:opacity-60 disabled:hover:bg-(--color-green)",
  secondary: "bg-white text-(--color-fg) border border-(--color-border) hover:bg-neutral-50",
  ghost: "bg-transparent text-(--color-muted) hover:text-(--color-fg)",
  danger: "bg-white text-[#8a4a3f] border border-[#e4d3cf] hover:bg-[#fbf4f2]",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-semibold cursor-pointer transition-colors disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
