import { Input } from "@/components/common/Input/Input";
import { useUI } from "@/contexts/UIContext";

type ArtistSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function ArtistSearch({ value, onChange }: ArtistSearchProps) {
  const { t } = useUI();

  return (
    <Input
      label={t("artistSearch")}
      onChange={(event) => onChange(event.target.value)}
      placeholder={t("artistSearchPlaceholder")}
      tone="dark"
      value={value}
    />
  );
}
