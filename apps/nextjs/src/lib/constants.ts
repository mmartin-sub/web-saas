/**
 * The base URL for the discord server.
 * @constant
 */
export const DISCORD_SERVER = "https://discord.gg/nata9PpP";

/**
 * If the section that is showing the discord page should be hidden
 * @constant
 */
export const HIDE_DISCORD_LINK = true;

/**
 * If the section that is showing the WORD section should be hidden
 * see: WobbleCardShow with Philosophy, ...
 * @constant
 */
export const HIDE_WORD_SECTION = false;

/**
 * If the section that is showing the Questions section should be hidden
 * @constant
 */
export const HIDE_QUESTIONS_SECTION = false;

/**
 * Hide the sentence next to the WORDS section with a special effect if we scroll down
 * @constant
 */
export const HIDE_WORD_REVEAL = false;

/**
 * Hide the Blog section in the homepage
 * @constant
 */
export const HIDE_BLOG_HOMEPAGE = false;

/**
 * Hide the Featurecard section in the homepage - flow of notifications of actions requested by the user
 * @constant
 */
export const HIDE_FEATURECARD_HOMEPAGE = false;

/**
 * define the default theme within next template
 * Should be a theme defined as per https://nextui.org/docs/customization/dark-mode
 * but not the case today?
 * @constant
 */
export const DEFAULT_THEME_LAYOUT = "dark";

/**
 * define the keywords for the website
 * @constant
 */
export const SITECONFIG_KEYWORDS = [
  "ai",
  "swiss",
  "switzerland",
  "safe",
  "trust",
  "privacy",
  "productivity",
  "quality",
  "team",
  "business",
];

/**
 * define the in ms the transition AnimatedList
 * not used for now as the code to use it should be under:
 * packages/ui/src/animated-list.tsx
 * @constant
 */
export const DELAY_FEATURE = 3000;

/**
 * define the in right part of the email of the web site.
 * in an ideal word, should be part of the .env file
 * @todo: implement it using .env file
 * @constant
 */
export const domainexamples = '@substantifik.com';
