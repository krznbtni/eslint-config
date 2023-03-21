const { isPackageExists } = require("local-pkg");

const TS = isPackageExists("typescript");

if (!TS)
  console.warn(
    "[@krznbtni/eslint-config] TypeScript is not installed, fallback to JS only."
  );

module.exports = {
  overrides: [
    {
      files: ["*.svelte"],
      parser: "svelte-eslint-parser",
      parserOptions: {
        sourceType: "module",
        parser: {
          // Specify a parser for each lang.
          ts: "@typescript-eslint/parser",
          js: "espree",
          typescript: "@typescript-eslint/parser",
        },
      },
      rules: {
        "no-unused-vars": "off",
        "no-undef": "off",
        ...(TS ? { "@typescript-eslint/no-unused-vars": "off" } : null),
      },
    },
  ],
  extends: [
    "plugin:svelte/recommended",
    TS ? "@krznbtni/eslint-config-ts" : "@krznbtni/eslint-config-basic",
  ],
  rules: {},
};
