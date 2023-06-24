const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === "production";

let config = {
  entry: ["./src/index", "./src/home"],
  // entry: { index: "./src/index", home: "./src/home" },
  output: {
    filename: "main.js",
    // filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true // checks for output files in dist and deletes any extra from prev. build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // used to incorporate build created by js
    }),
    new MiniCssExtractPlugin({
      filename: "bundle.css" // to change the filename
    }),
  ],
  module: {
    rules: [
      // {
      //   test: /\.js/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     }
      //   }
      // },
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          //Using MiniCssExtract loader gives separate file as opposed to style loader putting css in js bundle
          // MiniCssExtractPlugin.loader, 
          "style-loader",
          "css-loader"]
      },
      {
        test: /\.scss/,
        exclude: /node_modules/,
        use: [
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader", // postcss added after css
            options: {
              postcssOptions: {
                plugins: [
                  ["postcss-preset-env", {}]
                ]
              }
            }
          },
          "sass-loader"]
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    // liveReload: false, // to disable liveServer
    static: "./dist",
    watchFiles: ["src/**/*", "index.html"] // if these files changes devServer will refresh browser
    // still on every save build is done, it just not refreshes the browser everytime, if watchFiles present 
  },
};

if (isProduction) {
  config.mode = "production";
  config.devtool = "inline-source-map"; // or any other relevant to prod
}

module.exports = config;

