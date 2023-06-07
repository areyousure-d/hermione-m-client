import { resolve } from "path";
import svg from "@neodx/svg/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
// eslint-disable-next-line import/no-default-export
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ["effector/babel-plugin"],
      },
    }),
    svg({
      root: "src/assets",
      group: true,
      output: "public",
      definitions: "src/shared/ui/icon/sprite.h.ts",
      resetColors: {
        replaceUnknown: "currentColor",
      },
    }),
  ],

  resolve: {
    alias: [{ find: "@", replacement: resolve(__dirname, "src") }],
  },

  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
  },
});
