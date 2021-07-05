const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const projectRoot = path.resolve(__dirname, "..");

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    path: path.resolve(projectRoot, "build/production"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].bundle.js",
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
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
});
