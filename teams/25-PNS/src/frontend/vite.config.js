// vite.config.js
const { resolve } = require("path");
import tsconfigPaths from "vite-tsconfig-paths";

module.exports = {
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        nested: resolve(__dirname, "portal/index.html"),
      },
    },
  },
  plugins: [tsconfigPaths()],
};
