import "server-only";

import type { Locale } from "~/config/i18n-config";

// Define the type for your dictionary with an index signature
export type Dictionary = Record<string, Record<string, string>>;

// Define the type for the dictionary loader
type DictionaryLoader = () => Promise<Dictionary>;

interface Dictionaries {
  [key: string]: DictionaryLoader; // Should be a Locale
}

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {

  en: () => import("~/config/dictionaries/en.json").then((module) => module.default as Dictionary),
  zh: () => import("~/config/dictionaries/zh.json").then((module) => module.default as Dictionary),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries.en;
  if (!loader) {
    throw new Error(`Dictionary for locale '${locale}' not found and no default dictionary available.`);
  }
  return loader();
};

/* getDictionarySync
*
*/
export const getDictionarySync = (locale: Locale) : Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
