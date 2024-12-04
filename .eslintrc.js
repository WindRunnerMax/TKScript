module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es2021: true,
  },
  parserOptions: {
    requireConfigFile: false,
    ecmaVersion: 2020,
    sourceType: "module",
  },
  overrides: [
    {
      files: ["*.ts"],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
      extends: ["plugin:@typescript-eslint/recommended"],
    },
    {
      files: ["*.tsx"],
      parser: "@typescript-eslint/parser",
      plugins: ["react", "react-hooks", "@typescript-eslint/eslint-plugin"],
      extends: ["plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
    },
  ],
  ignorePatterns: ["node_modules", "build", "dist", "coverage", "public"],
  rules: {
    "semi": "error",
    "quote-props": ["error", "consistent-as-needed"],
    "arrow-parens": ["error", "as-needed"],
    "no-var": "error",
    "prefer-const": "error",
    "no-console": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/consistent-type-imports": "error",
  },
};
