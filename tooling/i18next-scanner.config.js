const typescriptTransform = require('i18next-scanner-typescript');

module.exports = {
  input: [
    'apps/nextjs/src/**/*.{js,jsx,ts,tsx}',
    // Use ! to filter out files or directories
    '!apps/nextjs/src/config/dictionaries/**',
    '!**/node_modules/**',
  ],
  output: './',
  options: {
    debug: true,
    func: {
      list: ['i18next.t', 'i18n.t', 't'],
      extensions: ['.js', '.jsx'],
    },
    trans: false,
    lngs: ['en', 'fr', 'de', 'es', 'it', 'ja', 'ko', 'zh'],
    ns: ['translation'],
    defaultLng: 'en',
    defaultNs: 'translation',
    defaultValue: function (lng, ns, key) {
      return '[' + lng + ']' + key;
    },
    resource: {
      loadPath: 'apps/nextjs/src/config/dictionaries/{{lng}}.json',
      savePath: 'apps/nextjs/src/config/dictionaries/{{lng}}.json',
      jsonIndent: 2,
      lineEnding: '\n',
    },
    nsSeparator: false, // namespace separator
    keySeparator: false, // key separator
    interpolation: {
      prefix: '{{',
      suffix: '}}',
    },
  },
  transform: typescriptTransform({
    extensions: ['.ts', '.tsx'],
    tsOptions: {
      target: 'es2017',
    },
  }),
};