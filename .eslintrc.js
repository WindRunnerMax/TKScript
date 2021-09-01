module.exports = {
    "extends": "eslint:recommended",
    "env": {
        "browser": true,
        "node": true,
        "commonjs": true,
        "es2021": true,
    },
    "parserOptions": {
        "requireConfigFile": false,
        "ecmaVersion": 7,
        "sourceType": "module",
    },
    "globals": {
        "window": true,
        "unsafeWindow": true,
        "GM_xmlhttpRequest": true,
        "Promise": true
    },
    "rules": {
        // 分号
        "semi": "error",
        // const
        "prefer-const": "error",
        // 允许console
        "no-console": "off",
        // no var
        "no-var": "error",
    },
};
