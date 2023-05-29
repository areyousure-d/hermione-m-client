const { configure, presets } = require("eslint-kit");

module.exports = configure({
  presets: [
    presets.node(),
    presets.imports({
      sort: {
        newline: true,
      },
      alias: {
        root: "./src",
        paths: { "@": "./" },
      },
    }),
    presets.typescript({
      root: "./",
      tsconfig: "tsconfig.json",
    }),
    presets.react({
      version: "18.0",
    }),
  ],
});
