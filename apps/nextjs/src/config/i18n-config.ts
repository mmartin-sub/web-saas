//i18n Defines list of locales
export const i18n = {
  defaultLocale: "en",
  locales: [
    "en",
    // This list should be the same as localeMap, or UI issue otherwise
    // "de", "es", "fr", "it",
    // "zh", "ko", "ja"
  ],
} as const;

// Locale type
export type Locale = (typeof i18n)["locales"][number];

//localeMap defines list of proposed languages
export const localeMap = {
  en: "English",

  /*
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  */

  /*
  zh: "中文",
  ko: "한국어",
  ja: "日本語",
  */
} as const;
