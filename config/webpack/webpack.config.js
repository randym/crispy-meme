// See the shakacode/shakapacker README and docs directory for advice on customizing your webpackConfig.
const path = require("path");
const { generateWebpackConfig } = require("shakapacker");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ForkTSCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const options = {
  resolve: {
    extensions: [".css", "scss"],
  },
  plugins: [
    new ForkTSCheckerWebpackPlugin({
      typescript: { configFile: "tsconfig.json" },
    }),
  ],
};

const loaders = {
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "app/javascript/stylesheets"),
        use: [MiniCssExtractPlugin.loader, "postcss-loader", "css-loader"],
      },
    ],
  },
};
const config = generateWebpackConfig(options);
const customConfig = merge(config, loaders);
module.exports = customConfig;
