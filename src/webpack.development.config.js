const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  context: path.join(__dirname, "./"),
  entry: {
    en: "./en/main.ts",
    de: "./de/main.ts"
  },
  output: {
    filename: "[name]/main.js",
    path: __dirname + "/.."
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./en/index.html",
      filename: "./index.html",
      chunks: ["en"]
    }),
    new HtmlWebpackPlugin({
      template: "./de/index.html",
      filename: "./de/index.html",
      chunks: ["de"]
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "./www" },
        {
          context: "../node_modules/osm-app-component/dist/",
          from: "*/local.js",
          to: "[path]/[path][name][ext]"
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: "[name]/main.css"
    })
  ],
  mode: "development",
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",

  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/env", "@babel/typescript"],
              plugins: [
                ["@babel/transform-runtime"],
                "@babel/proposal-class-properties",
                "@babel/proposal-object-rest-spread"
              ]
            }
          }
        ]
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000
        }
      }
    ]
  }
};
