module.exports = {
  mode: "development",
  entry: "./src/js/app.js",
  output: {
    path: __dirname + "/dist",
    filename: "bundle.js"
  },
  devServer: {
    host: "0.0.0.0",
    port: 3003,
    https: false,
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000
    }
  }
};
