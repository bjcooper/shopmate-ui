const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/html/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "./src/html/front.html",
      filename: "front.html"
    }),
    new WebpackMd5Hash()
  ],
  resolve: {
    alias: {
      scss: path.resolve(__dirname, "src/scss")
    }
  },
  devServer: {
    host: "0.0.0.0",
    port: 3003,
    contentBase: path.join(__dirname, "dist"),
    https: false,
    disableHostCheck: true,
    watchOptions: {
      ignored: /node_modules/,
      poll: 1000
    }
  }
};
