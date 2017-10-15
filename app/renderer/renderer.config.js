/**
 * Webpack config for compiling renderer
 */

const path = require("path");

module.exports = {
  context: path.resolve(__dirname),
  entry: ["babel-polyfill", "./index.js"],
  output: {
    path: path.resolve("app/.compiled"),
    filename: "renderer.bundle.js",
    library: "app",
    libraryTarget: "commonjs2"
  },
  target: "electron-renderer",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["env", "react", "stage-2"]
        }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["env", "react", "stage-2"]
        }
      }
    ]
  }
};
