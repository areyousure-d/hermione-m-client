import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  base: "/hermione-m-client/",
  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
        // Use .babelrc files
        babelrc: true,
        // Use babel.config.js files
        configFile: true,
      },
    }),
  ],

  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "./src/") }],
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});
