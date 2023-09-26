const path = require("path");
const { default: HtmlPlugin } = require("@rspack/plugin-html");
const FilePlugin = require("./script/file");

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    popup: "./src/popup/index.tsx",
    content: "./src/content/index.ts",
    inject: "./src/inject/index.ts",
  },
  plugins: [
    new HtmlPlugin({
      filename: "popup.html",
      template: "./public/popup.html",
      inject: false,
    }),
    new FilePlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  builtins: {
    define: {
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    },
    pluginImport: [
      {
        libraryName: "@arco-design/web-react",
        style: true,
      },
    ],
  },
  module: {
    rules: [
      { test: /\.svg$/, type: "asset" },
      {
        test: /\.module.scss$/,
        use: [{ loader: "sass-loader" }],
        type: "css/module",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
                importLoaders: true,
                localIdentName: "[name]__[hash:base64:5]",
              },
            },
          },
        ],
        type: "css",
      },
    ],
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
  },
};

// https://www.rspack.dev/
