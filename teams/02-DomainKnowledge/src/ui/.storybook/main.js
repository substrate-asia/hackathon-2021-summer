const webpackConfig = require("../config/webpack.common.js");

module.exports = {
  stories: ["../storybook/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@react-theming/storybook-addon",
  ],
  webpackFinal: (config) => {
    return {
      ...config,
      resolve: { ...config.resolve, alias: webpackConfig.resolve.alias },
    };
  },
  typescript: {
    reactDocgen: "react-docgen",
    compilerOptions: {
      "esModuleInterop": true,
      paths: {
        "@model/*": ["src/model/*"],
        "@store": ["src/store/index.ts"],
        "@store/*": ["src/store/*"],
        "@component/*": ["src/component/*"],
        "@route": ["src/route/index.ts"],
        "@route/*": ["src/route/*"],
        "@scene/*": ["src/scene/*"],
        "@util/*": ["src/util/*"],
      },
    },
  },
};
