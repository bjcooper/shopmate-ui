const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
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
      filename: "style.[contenthash].css",
    }),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: './src/public/index.html',
      filename: 'index.html'
    }),
    new WebpackMd5Hash()
  ],
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
