import { Input } from "@/components/common/Input/Input";
import { useUI } from "@/contexts/UIContext";

type AlbumSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function AlbumSearch({ value, onChange }: AlbumSearchProps) {
  const { t } = useUI();

  return (
    <Input
      label={t("albumSearch")}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t("albumSearchPlaceholder")}
      value={value}
    />
  );
}
