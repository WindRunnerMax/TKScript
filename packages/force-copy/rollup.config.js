import esbuild from "rollup-plugin-esbuild";
import path from "path";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import html from "@rollup/plugin-html";

// https://unpkg.com/@arco-design/web-react@2.53.2/dist/css/arco.min.css
// https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/17.0.2/umd/react.production.min.js
// https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/17.0.2/umd/react-dom.production.min.js
const template = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>POPUP</title>
    <link rel="stylesheet" href="static/arco.min.css" />
    <link rel="stylesheet" href="./popup.css" />
    <script src="static/react.production.min.js" type="application/javascript"></script>
    <script src="static/react-dom.production.min.js" type="application/javascript"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
  <script src="popup.js"></script>
</html>
`;

const resolver = resolve({
  extensions: [".js", ".jsx", ".ts", ".tsc"],
});

const getConfig = (name, input, options = {}) => ({
  external: ["react", "react-dom"],
  input: {
    [name]: input,
  },
  output: {
    dir: "./dist",
    format: "iife",
    globals: {
      "react": "React",
      "react-dom": "ReactDOM",
    },
  },
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs({ include: /node_modules/ }),
    alias({
      entries: [
        { find: "@", replacement: path.resolve("src") },
        { find: "copy", replacement: path.resolve("node_modules/copy") },
        { find: "copy-currency", replacement: path.resolve("node_modules/copy-currency") },
      ],
      customResolver: resolver,
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.EVENT_TYPE": JSON.stringify("EVENT_TYPE"),
      "preventAssignment": true,
    }),
    esbuild({
      include: [/src/, /node_modules\/copy/, /node_modules\/copy-currency/],
      sourceMap: false,
      target: "es2015",
      charset: "utf8",
      tsconfig: path.resolve(__dirname, "tsconfig.json"),
    }),
    ...(options.plugins || []),
  ],
});

export default [
  getConfig("popup", "./src/popup/index.tsx", {
    plugins: [
      postcss({
        minimize: true,
        extract: path.resolve("dist/popup.css"),
        extensions: [".css", ".scss"],
      }),
      html({
        fileName: "popup.html",
        template: () => template,
      }),
    ],
  }),
  getConfig("content", "./src/content/index.ts"),
  getConfig("inject", "./src/inject/index.ts"),
  getConfig("worker", "./src/worker/index.ts"),
];
