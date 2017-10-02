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
          presets: ["env", "react"]
        }
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ["env", "react"]
        }
      },
      {
        test: /\.svg/,
        use: {
          loader: "svg-url-loader",
          options: {}
        }
      }
    ]
  }
};
