import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["**/*.config.js"],
    rules: {
      semi: "error",
    },
  },
]);
