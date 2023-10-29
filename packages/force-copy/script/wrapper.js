const { isChromium } = require("./utils");

exports.WrapperCodePlugin = class WrapperCodePlugin {
  constructor(options) {
    this.options = options || {};
  }
  apply(compiler) {
    if (isChromium) return void 0;
    compiler.hooks.emit.tapAsync("WrapperCodePlugin", (compilation, done) => {
      Object.keys(compilation.assets).forEach(key => {
        if (!isChromium && key === process.env.INJECT_FILE + ".js") {
          try {
            const buffer = compilation.assets[key].source();
            let code = buffer.toString("utf-8");
            code = `window.${process.env.INJECT_FILE}=function(){${code}}`;
            compilation.assets[key] = {
              source() {
                return code;
              },
              size() {
                return this.source().length;
              },
            };
          } catch (error) {
            console.log("Parse Inject File Error", error);
          }
        }
      });
      done();
    });
  }
};
