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
      {
        test: /\.(ts|tsx|js)$/,
        exclude: [
          /node_modules/,
          /_test_*.*\.(ts|tsx|js)$/,
          /__test_*.*\.(ts|tsx|js)$/,
        ],
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-typescript",
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
};
const config = generateWebpackConfig(options);
const customConfig = merge(config, loaders);
module.exports = customConfig;
