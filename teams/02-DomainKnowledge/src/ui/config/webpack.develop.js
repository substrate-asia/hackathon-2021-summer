const { merge } = require("webpack-merge");
const webpack = require("webpack");
const common = require("./webpack.common.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  output: {
    publicPath: "/",
  },
  devServer: {
    port: 2121,
    historyApiFallback: true,
    //contentBase: ['build', path.join(__dirname, '../public')],
    overlay: {
      warnings: true,
      errors: true,
    },
  },

  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: [
          /node_modules/,
          /__tests__\/.*\.(tsx|ts)?$/,
          /e2e-test\/.*\.(tsx|ts)?$/,
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              plugins: ["react-refresh/babel"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.DefinePlugin({
      "process.browser": JSON.stringify(true),
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.DUMP_SESSION_KEYS": "undefined",
    }),
  ],
});
