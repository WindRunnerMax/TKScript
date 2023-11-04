const path = require("path");
const fs = require("fs");

// 条件编译: `process.env.PLATFORM`的深层次嵌套
// #IFDEF #ENDIF: `C/C++`预处理指令 平台层面扩展性

/**
 * @this {import('@rspack/core').LoaderContext}
 * @param {string} source
 * @returns {string}
 */
function IfDefineLoader(source) {
  // 检查参数配置
  /** @type {boolean} */
  const debug = this.query.debug || false;
  /** @type {(string|RegExp)[]} */
  const include = this.query.include || [path.resolve("src")];
  /** @type {(string|RegExp)[]} */
  const exclude = this.query.exclude || [/node_modules/];
  /** @type {string} */
  const envKey = this.query.platform || "PLATFORM";

  // 过滤资源路径
  let hit = false;
  const resourcePath = this.resourcePath;
  for (const includeConfig of include) {
    const verified =
      includeConfig instanceof RegExp
        ? includeConfig.test(resourcePath)
        : resourcePath.startsWith(includeConfig);
    if (verified) {
      hit = true;
      break;
    }
  }
  for (const excludeConfig of exclude) {
    const verified =
      excludeConfig instanceof RegExp
        ? excludeConfig.test(resourcePath)
        : resourcePath.startsWith(excludeConfig);
    if (verified) {
      hit = false;
      break;
    }
  }
  if (debug && hit) {
    console.log("if-def-loader hit path", resourcePath);
  }
  if (!hit) return source;

  // 迭代时控制该行是否命中预处理条件
  const platform = (process.env[envKey] || "").toLowerCase();
  let terser = false;
  let revised = false;
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
        revised = true;
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

  // 测试文件复写
  if (debug && revised) {
    // rm -rf ./**/*.log
    console.log("if-def-loader revise path", resourcePath);
    fs.writeFile(resourcePath + ".log", target.join("\n"), () => null);
  }

  // 返回处理结果
  return target.join("\n");
}

module.exports = IfDefineLoader;
