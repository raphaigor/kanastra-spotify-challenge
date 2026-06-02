"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { dictionaries, type Locale, type TranslationKey } from "@/i18n";

type UIContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  selectedArtistId: string | null;
  setSelectedArtistId: (artistId: string | null) => void;
  t: (key: TranslationKey) => string;
};

const UIContext = createContext<UIContextValue | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("pt-BR");
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const value = useMemo<UIContextValue>(
    () => ({
      locale,
      setLocale,
      selectedArtistId,
      setSelectedArtistId,
      t: (key) => dictionaries[locale][key],
    }),
    [locale, selectedArtistId],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const context = useContext(UIContext);

  if (!context) {
    throw new Error("useUI must be used inside UIProvider");
  }

  return context;
}
