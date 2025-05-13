import eslint from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactNativePlugin from "eslint-plugin-react-native";
import expoConfig from "eslint-config-expo";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    ignores: ["node_modules", "dist"],
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: eslintPluginPrettier,
      react: reactPlugin,
      "react-native": reactNativePlugin,
    },
    rules: {
      "prettier/prettier": ["error", { tabWidth: 2, useTabs: false }],
      "react/react-in-jsx-scope": "off", // not needed in React 17+
      ...expoConfig.rules, // include Expo rules
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
