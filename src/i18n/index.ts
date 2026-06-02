import { enUS } from "./dictionaries/en-US";
import { ptBR } from "./dictionaries/pt-BR";

export const dictionaries = {
  "pt-BR": ptBR,
  "en-US": enUS,
} as const;

export type Locale = keyof typeof dictionaries;
export type TranslationKey = keyof typeof ptBR;
