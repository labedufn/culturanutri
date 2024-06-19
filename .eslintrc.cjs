module.exports = {
  root: true,
  plugins: ["prettier"],
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["backend/**/*.ts"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./backend/tsconfig.json",
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      plugins: ["@typescript-eslint", "prettier"],
      extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
      env: {
        node: true,
        es6: true,
      },
      rules: {},
    },
    {
      files: ["frontend/**/*.ts", "frontend/**/*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: "./frontend/tsconfig.json",
      },
      plugins: ["@typescript-eslint", "react", "react-hooks", "prettier"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@next/next/recommended",
        "plugin:prettier/recommended",
      ],
      env: {
        browser: true,
        es6: true,
      },
      rules: {
        "react/react-in-jsx-scope": "off", // Adicione esta linha
      },
    },
  ],
};
