module.exports = function (api) {
  api.cache(() => process.env.NODE_ENV === "production");
  const env = process.env.BABEL_ENV || process.env.NODE_ENV;

  if (env === "production") {
    return {
      presets: [
        "@babel/env",
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "babel-plugin-styled-components",
        "@babel/plugin-transform-runtime",
        // '@babel/plugin-syntax-dynamic-import',
      ],
    };
  } else {
    return {
      presets: [
        "@babel/env",
        "@babel/preset-typescript",
        "@babel/preset-react",
      ],
      plugins: [
        "@babel/plugin-transform-runtime",
        // '@babel/plugin-syntax-dynamic-import',
      ],
    };
  }
};
