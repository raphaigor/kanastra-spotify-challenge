"use client";

import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { dictionaries, type Locale, type TranslationKey } from "@/i18n";

const LOCALE_STORAGE_KEY = "spotify-explorer:locale";
const LOCALE_CHANGE_EVENT = "spotify-explorer:locale-change";
const DEFAULT_LOCALE: Locale = "pt-BR";

type UIContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  selectedArtistId: string | null;
  setSelectedArtistId: (artistId: string | null) => void;
  t: (key: TranslationKey) => string;
};

const UIContext = createContext<UIContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "pt-BR" || value === "en-US";
}

function getLocaleSnapshot(): Locale {
  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY);

  return isLocale(storedLocale) ? storedLocale : DEFAULT_LOCALE;
}

function getServerLocaleSnapshot(): Locale {
  return DEFAULT_LOCALE;
}

function subscribeToLocaleChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(LOCALE_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(LOCALE_CHANGE_EVENT, onStoreChange);
  };
}

export function UIProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeToLocaleChanges,
    getLocaleSnapshot,
    getServerLocaleSnapshot,
  );
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);

  const value = useMemo<UIContextValue>(
    () => {
      const setLocale = (nextLocale: Locale) => {
        window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
        window.dispatchEvent(new Event(LOCALE_CHANGE_EVENT));
      };

      return {
        locale,
        setLocale,
        selectedArtistId,
        setSelectedArtistId,
        t: (key) => dictionaries[locale][key],
      };
    },
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
