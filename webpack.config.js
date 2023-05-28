const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

let config = {
  entry: ["./src/index.js", "./src/home.js"],
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: "inline-source-map",
  mode: "development",
  devServer: {
    static: "./dist",
  },
};

if (isProduction) {
  config.mode = "production";
  config.devtool = "inline-source-map"; // or any other relevant to prod
}

module.exports = config;
