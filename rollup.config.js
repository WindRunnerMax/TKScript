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
                    targets: "last 2 versions, ie >= 10",
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
};

const scripts = {
    copy: {
        input: "./src/copy/src/index.ts",
        output: {
            file: "./dist/copy.js",
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
    siteDirector: {
        input: "./src/site-director/src/index.js",
        output: {
            file: "./dist/site-director.js",
            format: "iife",
            name: "linkModule",
        },
        plugins: [
            postcss(config.postcss),
            babel(config.babel),
            // uglify(),
            metablock({
                file: "./src/site-director/meta.json",
            }),
        ],
    },
};

export default [...Object.values(metas), ...Object.values(scripts)];

// https://segmentfault.com/a/1190000010628352
