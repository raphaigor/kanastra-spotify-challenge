import type { InputHTMLAttributes, ReactNode } from "react";
import { Search } from "lucide-react";
import clsx from "clsx";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  tone?: "dark" | "light";
};

export function Input({
  className,
  icon,
  label,
  tone = "light",
  ...props
}: InputProps) {
  const isDark = tone === "dark";

  return (
    <label
      className={clsx(
        "flex flex-col gap-2 text-sm font-semibold",
        isDark ? "text-neutral-200" : "text-neutral-700",
      )}
    >
      {label}
      <span
        className={clsx(
          "flex min-h-11 items-center gap-3 rounded-lg border px-3 transition-all duration-200 ease-out focus-within:-translate-y-px focus-within:shadow-lg",
          isDark
            ? "border-white/15 bg-white/10 text-white shadow-sm backdrop-blur focus-within:border-emerald-300/80 focus-within:shadow-emerald-950/40"
            : "border-neutral-300 bg-white text-neutral-950 focus-within:border-emerald-500 focus-within:shadow-emerald-950/10",
        )}
      >
        {icon ?? (
          <Search
            aria-hidden
            className={clsx("h-4 w-4", isDark ? "text-emerald-300" : "text-emerald-700")}
          />
        )}
        <input
          className={clsx(
            "w-full bg-transparent text-sm outline-none",
            isDark
              ? "text-white placeholder:text-neutral-400"
              : "text-neutral-950 placeholder:text-neutral-400",
            className,
          )}
          {...props}
        />
      </span>
    </label>
  );
}
