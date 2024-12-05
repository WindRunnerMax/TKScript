export const importScript = () => {
  const fn = window[process.env.INJECT_FILE as unknown as number] as unknown as () => void;
  // #IFDEF GECKO
  if (fn) {
    // FIX: FireFox 的 XML 阅读页面会嵌入 script 标签
    if (document instanceof XMLDocument) return void 0;
    const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    script.setAttribute("type", "text/javascript");
    // 这里的内容需要跟 WrapperCodePlugin 的 HASH 计算保持一致
    script.innerText = `;(${fn.toString()})();`;
    document.documentElement.appendChild(script);
    // 在这里仅移除 script 标签, 但不会删除 window 上的属性
    // 保证注入重试, inject 幂等且 content 处于隔离环境不会受到影响
    script.remove();
  }
  // #ENDIF
};
