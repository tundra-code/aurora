module.exports = {
  entry: "./convert.js",
  output: {
    filename: "bundle.js"
  },
  target: "node",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["es2015", "react"]
        }
      }
    ]
  }
};
