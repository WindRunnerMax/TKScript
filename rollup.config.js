import postcss from "rollup-plugin-postcss";
import babel from "@rollup/plugin-babel";
// import { terser } from "rollup-plugin-terser";
import metablock from "rollup-plugin-userscript-metablock";
import ts from "rollup-plugin-typescript2";
import path from "path";

const buildConfig = {
    postcss: {
        minimize: true,
        extensions: [".css"],
    },
    babel: {
        exclude: ["node_modules/**"],
        presets: [["@babel/env", { modules: false, targets: { chrome: "66", ie: "11" } }]],
        babelHelpers: "runtime",
    },
    ts: {
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        extensions: [".ts"],
    },
};

const scriptConfig = [
    {
        name: "Copy",
        meta: {
            input: "./meta/blank.js",
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
            input: "./meta/blank.js",
            output: "./dist/meta/copy-currency.meta.js",
            metaFile: "./packages/copy-currency/meta.json",
        },
        script: {
            input: "./packages/copy-currency/src/index.ts",
            output: "./dist/copy-currency.user.js",
            injectCss: false,
        },
    },
    {
        name: "SiteDirector",
        meta: {
            input: "./meta/blank.js",
            output: "./dist/meta/site-director.meta.js",
            metaFile: "./packages/site-director/meta.json",
        },
        script: {
            input: "./packages/site-director/src/index.ts",
            output: "./dist/site-director.user.js",
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
            postcss({ ...buildConfig.postcss, inject: item.script.injectCss }),
            babel(buildConfig.babel),
            ts(buildConfig.ts),
            // terser({ format: { comments: true } }),
            metablock({ file: item.meta.metaFile }),
        ],
    })),
];
