import { LanguageSwitcher } from "@/components/common/LanguageSwitcher/LanguageSwitcher";
import { useUI } from "@/contexts/UIContext";

export function HeroHeader() {
  const { t } = useUI();

  return (
    <section className="border-b border-white/10 bg-[#1db954]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-4 md:px-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1
            className="text-4xl font-black tracking-normal md:text-6xl"
            data-testid="hero-title"
          >
            {t("heroTitle")}
          </h1>
        </div>

        <div className="flex flex-col items-end gap-3">
          <p className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xs font-black uppercase text-neutral-950">
            {t("challengeLabel")}
          </p>

          <LanguageSwitcher />
        </div>
      </div>
    </section>
  );
}
