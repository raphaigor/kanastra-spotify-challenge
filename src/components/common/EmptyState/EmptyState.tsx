type EmptyStateProps = {
  message: string;
  tone?: "dark" | "light";
};

export function EmptyState({ message, tone = "light" }: EmptyStateProps) {
  return (
    <p
      className={
        tone === "dark"
          ? "rounded-lg bg-white/10 p-4 text-sm text-neutral-200"
          : "rounded-lg border border-neutral-200 bg-white p-4 text-sm text-neutral-600"
      }
    >
      {message}
    </p>
  );
}
