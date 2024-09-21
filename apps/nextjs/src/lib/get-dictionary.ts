import "server-only";

import DictionaryExample from "~/config/dictionaries/en.json";
import type { Locale } from "~/config/i18n-config";

//DictionarySubKey can be used only when the main key is not, otherwise, better to use type of Dictionary.price for example
// i.e. dict: Dictionary["business_billing"],
export type DictionarySubKey = Record<string, string>;

// Define the type for your dictionary with an index signature
export type Dictionary = typeof DictionaryExample;
// Record<string, DictionarySubKey>;

// Define the type for the dictionary loader
type DictionaryLoader = () => Promise<Dictionary>;

interface Dictionaries {
  [key: string]: DictionaryLoader; // Should be a Locale
}

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () =>
    import("~/config/dictionaries/en.json").then(
      (module) => module.default as Dictionary,
    ),
  zh: () =>
    import("~/config/dictionaries/zh.json").then(
      (module) => module.default as Dictionary,
    ),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  const loader = dictionaries[locale] || dictionaries.en;
  if (!loader) {
    throw new Error(
      `Dictionary for locale '${locale}' not found and no default dictionary available.`,
    );
  }
  return loader();
};

//getDictionarySync is not needed as the function is async. It would be used like this:
export const getDictionarySync = (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en();
