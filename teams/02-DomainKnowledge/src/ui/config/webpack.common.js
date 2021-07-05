const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const projectRoot = path.resolve(__dirname, "..");

module.exports = {
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".json", ".js"],
    modules: [
      path.resolve(projectRoot, "src"),
      path.resolve(projectRoot, "node_modules"),
    ],
    alias: {
      "@store": path.resolve(projectRoot, "src/store"),
      "@component": path.resolve(projectRoot, "src/component"),
      "@model": path.resolve(projectRoot, "src/model"),
      "@scene": path.resolve(projectRoot, "src/scene"),
      "@util": path.resolve(projectRoot, "src/util"),
      "@route": path.resolve(projectRoot, "src/route"),
    },
    fallback: {
      path: require.resolve("path-browserify/"),
      buffer: require.resolve("buffer/"),
      crypto: require.resolve("crypto-browserify/"),
      stream: require.resolve("stream-browserify/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        //include: path.resolve(context, 'node_modules'),
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 0,
              modules: false,
              sourceMap: true,
              camelCase: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    // https://github.com/ampedandwired/html-webpack-plugin
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(projectRoot, "src/index.html"),
      favicon: path.resolve(projectRoot, "assets/favicon.ico"),
    }),
    new webpack.ProvidePlugin({
      Buffer: ["buffer", "Buffer"],
      process: 'process/browser',
    }),
  ],
};
