const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === "production";

let config = {
  entry: ["./src/index", "./src/home"],
  // entry: { index: "./src/index", home: "./src/home" },
  output: {
    filename: "main.js",
    // filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // used to incorporate build created by js
      clean: true // checks for output files in dist and deletes any extra from prev. build
    })
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

