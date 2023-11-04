const path = require("path");
const { FilesPlugin } = require("./script/files");
const { ReloadPlugin } = require("./script/reload");
const { ManifestPlugin } = require("./script/manifest");
const { WrapperCodePlugin } = require("./script/wrapper");
const { default: HtmlPlugin } = require("@rspack/plugin-html");
const { getUniqueId, isDev, isGecko } = require("./script/utils/node");

const folder = isGecko ? "build-gecko" : "build";
const EVENT_TYPE = isDev ? "EVENT_TYPE" : getUniqueId();
const INJECT_FILE = isDev ? "INJECT_FILE" : getUniqueId();

process.env.EVENT_TYPE = EVENT_TYPE;
process.env.INJECT_FILE = INJECT_FILE;
process.env.PLATFORM = process.env.PLATFORM || "chromium";

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: __dirname,
  entry: {
    popup: "./src/popup/index.tsx",
    content: "./src/content/index.ts",
    worker: "./src/worker/index.ts",
    [INJECT_FILE]: "./src/inject/index.ts",
  },
  plugins: [
    new HtmlPlugin({
      filename: "popup.html",
      template: "./public/popup.html",
      inject: false,
    }),
    new FilesPlugin(),
    new ReloadPlugin(),
    new ManifestPlugin(),
    new WrapperCodePlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  builtins: {
    define: {
      "__DEV__": isDev,
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.PLATFORM": JSON.stringify(process.env.PLATFORM),
      "process.env.EVENT_TYPE": JSON.stringify(process.env.EVENT_TYPE),
      "process.env.INJECT_FILE": JSON.stringify(process.env.INJECT_FILE),
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
        test: /\.(m|module).scss$/,
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
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "./script/if-def",
            options: {
              // debug: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: "/",
    filename: "[name].js",
    path: path.resolve(__dirname, folder),
  },
  devtool: false,
};

// https://www.rspack.dev/
