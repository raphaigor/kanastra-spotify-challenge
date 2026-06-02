import type { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "danger";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: ButtonVariant;
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "inline-flex h-11 items-center justify-center gap-2 rounded-md px-4 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-40",
        variant === "primary" && "bg-neutral-950 text-white hover:bg-emerald-700",
        variant === "secondary" &&
          "border border-neutral-300 bg-white text-neutral-950 hover:border-emerald-400",
        variant === "danger" && "bg-red-950 text-white hover:bg-red-800",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
