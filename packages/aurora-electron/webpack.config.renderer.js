const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

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
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/main/windows/template.ejs"
    })
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx$/, loader: "babel-loader", exclude: /node_modules/ }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"]
  }
};
