import { Button } from "@/components/common/Button/Button";
import { useUI } from "@/contexts/UIContext";

type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const { t } = useUI();

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-950">
      <p>{message}</p>
      <Button className="mt-3 h-9 px-3 text-xs" onClick={onRetry} variant="danger">
        {t("retry")}
      </Button>
    </div>
  );
}
