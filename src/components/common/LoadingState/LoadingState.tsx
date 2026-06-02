type LoadingStateProps = {
  message: string;
  tone?: "dark" | "light";
};

export function LoadingState({ message, tone = "light" }: LoadingStateProps) {
  return (
    <p
      className={
        tone === "dark"
          ? "rounded-lg p-4 text-sm text-neutral-200"
          : "rounded-lg p-4 text-sm text-neutral-600"
      }
    >
      {message}
    </p>
  );
}
