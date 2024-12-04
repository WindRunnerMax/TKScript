const { IS_CHROMIUM } = require("../utils/node");
const crypto = require("crypto");

exports.WrapperCodePlugin = class WrapperCodePlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    if (IS_CHROMIUM) return void 0;
    compiler.hooks.emit.tapAsync("WrapperCodePlugin", (compilation, done) => {
      const injectKey = process.env.INJECT_FILE + ".js";
      const injectFile = compilation.assets[injectKey];
      const workerKey = "worker.js";
      const workerFile = compilation.assets[workerKey];
      if (injectFile) {
        // 处理 Inject Script
        const buffer = injectFile.source();
        const code = buffer.toString("utf-8");
        const source = `window.${process.env.INJECT_FILE}=function(){${code}}`;
        compilation.assets[injectKey] = {
          source() {
            return source;
          },
          size() {
            return this.source().length;
          },
        };
        // 处理 Worker Script
        if (workerFile) {
          const workerBuffer = workerFile.source();
          const workerCode = workerBuffer.toString("utf-8");
          const hash = crypto.createHash("sha256");
          hash.update(`;(function(){${code}})();`);
          const hashed = hash.digest("base64");
          const nonCSP = workerCode.replace("${CSP-HASH}", hashed);
          compilation.assets[workerKey] = {
            source() {
              return nonCSP;
            },
            size() {
              return this.source().length;
            },
          };
        }
      }
      done();
    });
  }
};
