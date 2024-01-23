module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
  },
  extends: [
    "plugin:@typescript-eslint/recommended", // recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "plugin:node/recommended",
    "plugin:jest/recommended",
    "plugin:import/recommended",
    // https://www.npmjs.com/package/eslint-plugin-import#typescript
    "plugin:import/typescript",
  ],
  rules: {
    // fix: `Import and export declarations are not supported yet. eslint(node/no-unsupported-features/es-syntax)`
    // NOTE: https://dev.to/michalbryxi/import-and-export-declarations-are-not-supported-yet-in-ts-fo7
    "node/no-unsupported-features/es-syntax": ["error", { ignores: ["modules"] }],
    "node/no-missing-import": ["off"], // fix: `"../**" is not found. eslint(node/no-missing-import)`
    // https://github.com/import-js/eslint-plugin-import/blob/HEAD/docs/rules/order.md
    "import/order": ["error", { "newlines-between": "always", alphabetize: { order: "asc" } }],
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
};
