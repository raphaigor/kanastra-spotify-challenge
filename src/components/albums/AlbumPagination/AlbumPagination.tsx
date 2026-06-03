import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/common/Button/Button";
import { useUI } from "@/contexts/UIContext";

type AlbumPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function AlbumPagination({
  currentPage,
  onPageChange,
  totalPages,
}: AlbumPaginationProps) {
  const { t } = useUI();

  return (
    <div
      className="mt-6 flex flex-col justify-between gap-3 border-t border-neutral-200 pt-5 sm:flex-row sm:items-center"
      data-testid="albums-pagination"
    >
      <p className="text-sm font-semibold text-neutral-600">
        {t("page")} {currentPage} {t("of")} {totalPages}
      </p>
      <div className="flex gap-2">
        <Button
          disabled={currentPage === 1}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          variant="secondary"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("previous")}
        </Button>
        <Button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {t("next")}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
