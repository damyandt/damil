module.exports = {
  input: ["src/**/*.{js,jsx,ts,tsx}"],
  output: "src/locales/$LOCALE/translation.json",
  locales: ["en", "bg"],
  defaultNamespace: "translation",
  keySeparator: false,
  namespaceSeparator: false,
  createOldCatalogs: false,
  keepRemoved: true,
  sort: false,
  updateFiles: true,
  lexers: {
    tsx: ["JsxLexer"],
    ts: ["JavascriptLexer"],
    jsx: ["JsxLexer"],
    js: ["JavascriptLexer"],
  },
};
