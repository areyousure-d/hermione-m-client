const { configure, presets } = require("eslint-kit");

module.exports = configure({
  presets: [
    presets.imports({
      sort: {
        newline: true,
      },
      alias: {
        root: "./src",
        "@": "./",
      },
    }),
    presets.node(),
    presets.prettier(),
    presets.typescript({
      root: "./",
      tsconfig: "tsconfig.json",
    }),
    presets.react({
      newJSXTransform: true,
    }),
    presets.effector(),
  ],
  extend: {
    rules: {
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
    },
  },
});
