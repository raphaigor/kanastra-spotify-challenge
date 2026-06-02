import clsx from "clsx";
import { useUI } from "@/contexts/UIContext";
import type { Locale } from "@/i18n";

const locales: Locale[] = ["pt-BR", "en-US"];

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useUI();

  return (
    <div className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/10 p-1 text-sm text-white">
      <span className="sr-only">{t("language")}</span>
      {locales.map((item) => (
        <button
          className={clsx(
            "rounded-md px-3 py-2 font-semibold transition",
            locale === item
              ? "bg-white text-neutral-950"
              : "text-neutral-300 hover:text-white",
          )}
          key={item}
          onClick={() => setLocale(item)}
          type="button"
        >
          {item === "pt-BR" ? "PT" : "EN"}
        </button>
      ))}
    </div>
  );
}
