import postcss from "rollup-plugin-postcss";
import esbuild from "rollup-plugin-esbuild";
import metablock from "rollup-plugin-userscript-metablock";
import path from "path";
import replace from "@rollup/plugin-replace";

const buildConfig = {
  replace: {
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    "process.env.CHANNEL": JSON.stringify(process.env.CHANNEL),
    "preventAssignment": true,
  },
  postcss: {
    minimize: true,
    extensions: [".css"],
  },
  esbuild: {
    exclude: [/node_modules/],
    sourceMap: false,
    target: "es2015",
    minify: false,
    charset: "utf8",
    tsconfig: path.resolve(__dirname, "tsconfig.json"),
  },
};

const scriptConfig = [
  {
    name: "Copy",
    meta: {
      input: "./meta/blank.ts",
      output: "./dist/meta/copy.meta.js",
      metaFile: "./packages/copy/meta.json",
    },
    script: {
      input: "./packages/copy/src/index.ts",
      output: "./dist/copy.user.js",
      injectCss: false,
    },
  },
  {
    name: "CopyCurrency",
    meta: {
      input: "./meta/blank.ts",
      output: "./dist/meta/copy-currency.meta.js",
      metaFile: "./packages/copy-currency/meta.json",
    },
    script: {
      input: "./packages/copy-currency/src/index.ts",
      output: "./dist/copy-currency.user.js",
    },
  },
  {
    name: "SiteDirector",
    meta: {
      input: "./meta/blank.ts",
      output: "./dist/meta/site-director.meta.js",
      metaFile: "./packages/site-director/meta.json",
    },
    script: {
      input: "./packages/site-director/src/index.ts",
      output: "./dist/site-director.user.js",
      injectCss: false,
    },
  },
  {
    name: "WaterMark",
    meta: {
      input: "./meta/blank.ts",
      output: "./dist/meta/water-mark.meta.js",
      metaFile: "./packages/water-mark/meta.json",
    },
    script: {
      input: "./packages/water-mark/src/index.ts",
      output: "./dist/water-mark.user.js",
      injectCss: false,
    },
  },
];

export default [
  ...scriptConfig.map(item => ({
    input: item.meta.input,
    output: {
      file: item.meta.output,
      format: "es",
      name: item.name + "Meta",
    },
    plugins: [metablock({ file: item.meta.metaFile })],
  })),
  ...scriptConfig.map(item => ({
    input: item.script.input,
    output: {
      file: item.script.output,
      format: "iife",
      name: item.name + "Module",
    },
    plugins: [
      replace({ ...buildConfig.replace }),
      postcss({ ...buildConfig.postcss, inject: item.script.injectCss }),
      esbuild(buildConfig.esbuild),
      // terser({ format: { comments: true } }),
      metablock({ file: item.meta.metaFile }),
    ],
  })),
];
