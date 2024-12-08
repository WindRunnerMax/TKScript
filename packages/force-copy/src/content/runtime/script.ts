export const importInjectScript = () => {
  const fn = window[process.env.INJECT_FILE as unknown as number] as unknown as () => void;
  // #IFDEF GECKO
  if (fn && document instanceof XMLDocument === false) {
    const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
    script.setAttribute("type", "text/javascript");
    // 这里的内容需要跟 WrapperCodePlugin 的 HASH 计算保持一致
    const code = `;(${fn.toString()})();`;
    script.innerText = code;
    document.documentElement.appendChild(script);
    // 在这里仅移除 script 标签, 但不会删除 window 上的属性
    // 保证注入重试, inject 幂等且 content 处于隔离环境不会受到影响
    script.remove();
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Sharing_objects_with_page_scripts
    const unsafeWindow = window.wrappedJSObject;
    const signal = process.env.EVENT_TYPE;
    // 此时说明页面中的脚本没有被注入 尝试以 blob 的形式注入
    if (unsafeWindow && !unsafeWindow[signal]) {
      const blob = new Blob([code], { type: "application/javascript" });
      const url = URL.createObjectURL(blob);
      const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
      script.setAttribute("type", "text/javascript");
      // 实际上这里是异步的引入 不能完全保证 document_start 的时机
      (<HTMLScriptElement>script).src = url;
      document.documentElement.appendChild(script);
      script.onload = () => {
        script.remove();
        // 如果仍然不存在 尝试在 Content Script 中执行
        // 在 Content Script 中执行可以保证 DOM 事件类型的处理
        !unsafeWindow[signal] && fn();
      };
      script.onerror = () => {
        script.remove();
        !unsafeWindow[signal] && fn();
      };
    }
  }
  // #ENDIF
};
