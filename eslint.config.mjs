import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    languageOptions: { globals: globals.node },
  },
  eslintConfigPrettier,
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
