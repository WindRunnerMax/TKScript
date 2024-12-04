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
  let nonceId = "";
  chrome.webRequest.onHeadersReceived.addListener(
    res => {
      if (!res.responseHeaders) return void 0;
      if (res.type !== "main_frame" && res.type !== "sub_frame") {
        return void 0;
      }
      for (let i = 0; i < res.responseHeaders.length; i++) {
        const responseHeaderName = res.responseHeaders[i].name.toLowerCase();
        if (responseHeaderName === "content-security-policy") {
          const value = res.responseHeaders[i].value || "";
          const nonce = /'nonce-([-+/=\w]+)'/.exec(value);
          if (nonce && nonce[1]) {
            nonceId = nonce[1];
          }
        }
      }
      return {
        responseHeaders: res.responseHeaders,
      };
    },
    { urls: URL_MATCH },
    ["responseHeaders"]
  );
  // https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript
  cross.tabs.onUpdated.addListener((_, changeInfo, tab) => {
    if (changeInfo.status == "loading") {
      const tabId = tab && tab.id;
      const tabURL = tab && tab.url;
      if (!tabId || !tabURL) return void 0;
      if (!URL_MATCH.some(match => new RegExp(match).test(tabURL))) {
        return void 0;
      }
      const code = `
        if (window["${process.env.INJECT_FILE}"] && document instanceof XMLDocument === false) {
          const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
          script.setAttribute("type", "text/javascript");
          script.innerText = \`;(\${window["${process.env.INJECT_FILE}"].toString()})();\`;
          script.nonce = "${nonceId}";
          document.documentElement.appendChild(script);
          // script.onload = () => script.remove();
          // delete window["${process.env.INJECT_FILE}"];
        };`;
      cross.tabs
        .executeScript(tabId, {
          allFrames: true,
          code: code,
          runAt: "document_start",
        })
        .catch(err => {
          if (__DEV__) logger.warning("Inject Script", err);
        });
    }
  });
  // #ENDIF
};
