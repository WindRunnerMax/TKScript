import { URL_MATCH } from "@/utils/constant";
import { cross } from "@/utils/global";
import { logger } from "@/utils/logger";

export const implantScript = () => {
  /**  RUN INJECT SCRIPT IN DOCUMENT START **/
  // #IFDEF CHROMIUM
  // https://bugs.chromium.org/p/chromium/issues/detail?id=634381
  // https://stackoverflow.com/questions/75495191/chrome-extension-manifest-v3-how-to-use-window-addeventlistener
  if (cross.scripting && cross.scripting.registerContentScripts) {
    logger.info("Register Inject Scripts By Scripting API");
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/registerContentScripts
    cross.scripting
      .registerContentScripts([
        {
          matches: [...URL_MATCH],
          runAt: "document_start",
          world: "MAIN",
          allFrames: true,
          js: [process.env.INJECT_FILE + ".js"],
          id: process.env.INJECT_FILE,
        },
      ])
      .catch(err => {
        logger.warning("Register Inject Scripts Failed", err);
      });
  } else {
    logger.info("Register Inject Scripts By Tabs API");
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
    cross.tabs.onUpdated.addListener((_, changeInfo, tab) => {
      if (changeInfo.status == "loading") {
        const tabId = tab && tab.id;
        const tabURL = tab && tab.url;
        if (tabURL && !URL_MATCH.some(match => new RegExp(match).test(tabURL))) {
          return void 0;
        }
        if (tabId && cross.scripting) {
          cross.scripting.executeScript({
            target: { tabId: tabId, allFrames: true },
            files: [process.env.INJECT_FILE + ".js"],
            injectImmediately: true,
          });
        }
      }
    });
  }
  // #ENDIF

  // #IFDEF GECKO
  logger.info("Register Inject Scripts By Content Script Inline Code");
  // 使用 cross.tabs.executeScript 得到的 window 是 content window
  // 此时就必须要使用 Inject Script 的方式才能正常注入脚本
  // 然而这种方式就会受到 CSP 的限制, 因此在这里处理 CSP 问题
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onHeadersReceived
  chrome.webRequest.onHeadersReceived.addListener(
    res => {
      if (!res.responseHeaders) return void 0;
      if (res.type !== "main_frame" && res.type !== "sub_frame") {
        return void 0;
      }
      for (let i = 0; i < res.responseHeaders.length; i++) {
        const responseHeaderName = res.responseHeaders[i].name.toLowerCase();
        // 仅处理 CSP 的问题
        if (responseHeaderName !== "content-security-policy") continue;
        const value = res.responseHeaders[i].value || "";
        const types = value.split(";").map(it => it.trim());
        const target: string[] = [];
        // CSP 不支持多个 nonce, 但可以配置多个 hash
        // 这里的 HASH 会在 WrapperCodePlugin 中计算并替换资源
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
        const hashed = "'sha256-${CSP-HASH}'";
        for (const item of types) {
          const [type, ...rest] = item.split(" ");
          if (type === "script-src" || type === "default-src") {
            target.push([type, hashed, ...rest].join(" "));
            continue;
          }
          target.push(item);
        }
        // 覆盖原有的响应头, 但扩展的 CSP 总是更倾向于更加严格的模式
        // 实际测试中仅有完全抹除标头时, 才可以解决冲突的问题
        res.responseHeaders[i].value = target.join(";");
        // 如果存在 nonce 的配置, 则尝试注入 Inject Script
        const nonce = /'nonce-([-+/=\w]+)'/.exec(value);
        if (nonce && nonce[1]) {
          const nonceId = nonce[1];
          const code = `
          if (window["${process.env.INJECT_FILE}"] && document instanceof XMLDocument === false) {
            const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
            script.setAttribute("type", "text/javascript");
            script.innerText = \`;(\${window["${process.env.INJECT_FILE}"].toString()})();\`;
            script.nonce = "${nonceId}";
            document.documentElement.appendChild(script);
            script.onload = () => script.remove();
          };`;
          const onUpdate = (_: number, changeInfo: chrome.tabs.TabChangeInfo) => {
            if (changeInfo.status !== "loading") return void 0;
            // https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript
            cross.tabs
              .executeScript(res.tabId, {
                allFrames: true,
                code: code,
                runAt: "document_start",
              })
              .catch(err => {
                if (__DEV__) logger.warning("Inject Script", err);
              });
            cross.tabs.onUpdated.removeListener(onUpdate);
          };
          // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/onUpdated
          // @ts-expect-error filter params
          cross.tabs.onUpdated.addListener(onUpdate, { tabId: res.tabId });
        }
      }
      // 返回修改后的响应头配置
      return {
        responseHeaders: res.responseHeaders,
      };
    },
    { urls: URL_MATCH, types: ["main_frame", "sub_frame"] },
    ["blocking", "responseHeaders"]
  );
  // #ENDIF
};
