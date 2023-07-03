const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const isProduction = process.env.NODE_ENV === "production";

let config = {
  entry: ["./src/index", "./src/home"],
  // entry: { index: "./src/index", home: "./src/home" },
  output: {
    filename: "main.js",
    // filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    clean: true, // checks for output files in dist and deletes any extra from prev. build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html", // used to incorporate build created by js
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "./images",
    //       to: "images",
    //     },
    //   ],
    // }),
    new MiniCssExtractPlugin({
      filename: "bundle.css", // to change the filename
    }),
    // new BundleAnalyzerPlugin(), // for when we want to analyze our bundles through build
  ],
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.ts/,
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.html/,
        exclude: /node_modules/,
        use: "html-loader",
      },
      // {
      //   test: /\.(png|jpg)$/i,
      //   type: "asset/inline",
      // },
      // {
      //   test: /\.(png|jpg)$/i,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "images/[hash][name][ext]"
      //   }
      // },
      {
        test: /\.(png|jpg)$/i,
        type: "asset", // for both inline and resources
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, //Only imgs below 20kb would be inlined
          },
        },
        generator: {
          filename: "images/[hash][name][ext]",
        },
      },
      {
        test: /\.txt/,
        type: "asset/source",
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [
          //Using MiniCssExtract loader gives separate file as opposed to style loader putting css in js bundle
          // MiniCssExtractPlugin.loader,
          "style-loader",
          "css-loader",
        ],
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
                plugins: [["postcss-preset-env", {}]],
              },
            },
          },
          "sass-loader",
        ],
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
    watchFiles: ["src/**/*", "index.html"], // if these files changes devServer will refresh browser
    // still on every save build is done, it just not refreshes the browser everytime, if watchFiles present
    proxy: {
      "/api": {
        target: "http://jsonplaceholder.typicode.com", // Added for reference purposes; Gives 'Direct IP access not allowed' error
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

if (isProduction) {
  config.mode = "production";
  config.devtool = "inline-source-map"; // or any other relevant to prod
}

module.exports = config;
