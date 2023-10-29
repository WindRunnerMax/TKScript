const path = require("path");
const fs = require("fs");

// 条件编译: `process.env.PLATFORM`的深层次嵌套
// #IFDEF #ENDIF: `C/C++`预处理指令 平台层面扩展性

const src = path.resolve("src");
/**
 * @type {import('@rspack/core').LoaderContext}
 * @param {string} source
 * @returns {string}
 */
function DefineLoader(source) {
  const debug = this.query.debug;
  const resourcePath = this.resourcePath;
  const platform = (process.env.PLATFORM || "").toLowerCase();
  if (!platform || !resourcePath.startsWith(src)) return source;
  // 迭代时控制该行是否命中预处理条件
  let terser = false;
  let terserIndex = -1;
  /** @type {number[]} */
  const stack = [];
  const lines = source.split("\n");
  const target = lines.map((line, index) => {
    // 去掉首尾的空白 去掉行首注释符号与空白符(可选)
    const code = line.trim().replace(/^\/\/\s*/, "");
    // 检查预处理指令起始 `#IFDEF`只会置`true`
    if (/^#IFDEF/.test(code)) {
      stack.push(index);
      // 如果是`true`继续即可
      if (terser) return "";
      const match = code.replace("#IFDEF", "").trim();
      const group = match.split("|").map(item => item.trim().toLowerCase());
      if (group.indexOf(platform) === -1) {
        terser = true;
        terserIndex = index;
      }
      return "";
    }
    // 检查预处理指令结束 `#IFDEF`只会置`false`
    if (/^#ENDIF$/.test(code)) {
      const index = stack.pop();
      // 额外的`#ENDIF`忽略
      if (index === undefined) return "";
      if (index === terserIndex) {
        terser = false;
        terserIndex = -1;
      }
      return "";
    }
    // 如果命中预处理条件则擦除
    if (terser) return "";
    return line;
  });
  if (debug) {
    // rm -rf ./**/*.log
    fs.writeFile(resourcePath + ".log", target.join("\n"), () => null);
  }
  return target.join("\n");
}

module.exports = DefineLoader;
