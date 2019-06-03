const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');

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
        exclude: /node_modules/,
        use: [
          process.env.NODE_ENV !== "production" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
              context: path.resolve(__dirname, "src"),
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.[hash].css",
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/html/index.html",
      filename: "index.html"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/html/catalog.html",
      filename: "catalog.html"
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: "./src/html/blog.html",
      filename: "blog.html"
    }),
    new CopyPlugin([
      { from: './src/robots.txt' },
    ]),
    new WebpackMd5Hash()
  ],
  resolve: {
    alias: {
      scss: path.resolve(__dirname, "src/scss"),
      images: path.resolve(__dirname, "src/images")
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
