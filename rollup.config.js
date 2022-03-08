import postcss from "rollup-plugin-postcss";
import babel from "rollup-plugin-babel";
// import { uglify } from "rollup-plugin-uglify";
import metablock from "rollup-plugin-userscript-metablock";
import ts from "rollup-plugin-typescript2";
import path from "path";

const config = {
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

const metas = {
    copy: {
        input: "./meta/blank.js",
        output: {
            file: "./dist/meta/copy.meta.js",
            format: "es",
            name: "copyMetaModule",
        },
        plugins: [
            metablock({
                file: "./src/copy/meta.json",
            }),
        ],
    },
    copyCurrency: {
        input: "./meta/blank.js",
        output: {
            file: "./dist/meta/copy-currency.meta.js",
            format: "es",
            name: "copyMetaModule",
        },
        plugins: [
            metablock({
                file: "./src/copy-currency/meta.json",
            }),
        ],
    },
    siteDirector: {
        input: "./meta/blank.js",
        output: {
            file: "./dist/meta/site-director.meta.js",
            format: "es",
            name: "copyMetaModule",
        },
        plugins: [
            metablock({
                file: "./src/site-director/meta.json",
            }),
        ],
    },
};

const scripts = {
    copy: {
        input: "./src/copy/src/index.ts",
        output: {
            file: "./dist/copy.user.js",
            format: "iife",
            name: "copyModule",
        },
        plugins: [
            postcss(config.postcss),
            babel(config.babel),
            ts({
                tsconfig: path.resolve(__dirname, "./tsconfig.json"),
                extensions: [".ts"],
            }),
            // uglify(),
            metablock({
                file: "./src/copy/meta.json",
            }),
        ],
    },
    copyCurrency: {
        input: "./src/copy-currency/src/index.ts",
        output: {
            file: "./dist/copy-currency.user.js",
            format: "iife",
            name: "copyModule",
        },
        plugins: [
            postcss(config.postcss),
            babel(config.babel),
            ts({
                tsconfig: path.resolve(__dirname, "./tsconfig.json"),
                extensions: [".ts"],
            }),
            // uglify(),
            metablock({
                file: "./src/copy-currency/meta.json",
            }),
        ],
    },
    siteDirector: {
        input: "./src/site-director/src/index.ts",
        output: {
            file: "./dist/site-director.user.js",
            format: "iife",
            name: "linkModule",
        },
        plugins: [
            postcss(config.postcss),
            babel(config.babel),
            ts({
                tsconfig: path.resolve(__dirname, "./tsconfig.json"),
                extensions: [".ts"],
            }),
            // uglify(),
            metablock({
                file: "./src/site-director/meta.json",
            }),
        ],
    },
};

export default [...Object.values(metas), ...Object.values(scripts)];

// https://segmentfault.com/a/1190000010628352
