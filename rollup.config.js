import postcss from "rollup-plugin-postcss";
import babel from "rollup-plugin-babel";
// import { uglify } from "rollup-plugin-uglify";
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
        presets: [
            [
                "@babel/env",
                {
                    modules: false,
                    targets: "last 2 versions, ie > 10",
                },
            ],
        ],
    },
};

const scriptConfig = [
    {
        name: "Copy",
        meta: {
            input: "./meta/blank.js",
            output: "./dist/meta/copy.meta.js",
            metaFile: "./src/copy/meta.json",
        },
        script: {
            input: "./src/copy/src/index.ts",
            output: "./dist/copy.user.js",
        },
    },
    {
        name: "CopyCurrency",
        meta: {
            input: "./meta/blank.js",
            output: "./dist/meta/copy-currency.meta.js",
            metaFile: "./src/copy-currency/meta.json",
        },
        script: {
            input: "./src/copy-currency/src/index.ts",
            output: "./dist/copy-currency.user.js",
        },
    },
    {
        name: "SiteDirector",
        meta: {
            input: "./meta/blank.js",
            output: "./dist/meta/site-director.meta.js",
            metaFile: "./src/site-director/meta.json",
        },
        script: {
            input: "./src/site-director/src/index.ts",
            output: "./dist/site-director.user.js",
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
            postcss(buildConfig.postcss),
            babel(buildConfig.babel),
            ts({
                tsconfig: path.resolve(__dirname, "tsconfig.json"),
                extensions: [".ts"],
            }),
            // uglify(),
            metablock({ file: item.meta.metaFile }),
        ],
    })),
];

// https://segmentfault.com/a/1190000010628352
