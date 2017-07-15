module.exports = {
  entry: "./src/main/index.js",
  output: {
    filename: "compiled/main.js"
  },
  target: "electron",
  node: {
    __dirname: false
  }
};
