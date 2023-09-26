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
  ],
  ignorePatterns: ["node_modules", "build", "dist", "coverage"],
  rules: {
    // 分号
    "semi": "error",
    // 对象键值引号样式保持一致
    "quote-props": ["error", "consistent-as-needed"],
    // 箭头函数允许单参数不带括号
    "arrow-parens": ["error", "as-needed"],
    // no var
    "no-var": "error",
    // const
    "prefer-const": "error",
    // 允许console
    "no-console": "off",
  },
};
