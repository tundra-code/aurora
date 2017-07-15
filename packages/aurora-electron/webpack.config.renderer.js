const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/renderer/index.js",
  output: {
    path: __dirname + "/compiled",
    filename: "renderer.js"
  },
  target: "electron-renderer",
  node: {
    __dirname: false
  },
  plugins: [new HtmlWebpackPlugin()]
};
