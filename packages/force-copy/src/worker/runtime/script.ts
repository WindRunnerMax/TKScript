import { URL_MATCH } from "@/utils/constant";
import { cross } from "@/utils/global";
import { logger } from "@/utils/logger";
import { CODE_PREFIX, CODE_SUFFIX } from "../utils/constant";

export const importWorkerScript = () => {
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
          // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript
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
  // 此时就必须要使用 inject script 的方式才能正常注入脚本
  // 然而这种方式就会受到 content security policy 策略的限制
  // https://github.com/violentmonkey/violentmonkey/issues/1001
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
        // 这里的 hash 会在编译时计算并替换资源
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
        // 覆盖原有的响应头, 扩展的 CSP 总是更倾向于更加严格的模式
        // 实际测试中仅有完全抹除标头时, 才可以解决冲突的问题
        res.responseHeaders[i].value = target.join(";");
        // 存在 CSP 时尝试直接在 content script 中执行
        let code = [
          `if (window["${process.env.INJECT_FILE}"] && document instanceof XMLDocument === false) {`,
          `  window["${process.env.INJECT_FILE}"]();`,
          `};`,
        ].join("\n");
        // 如果存在 blob: 的配置 尝试以 blob src 的形式注入
        if (/script-src[- \w']+blob:/.test(value)) {
          code = [
            CODE_PREFIX,
            `script.src = URL.createObjectURL(new Blob([code]));`,
            CODE_SUFFIX,
          ].join("\n");
        }
        // 如果存在 nonce 的配置 则会尝试以 nonce 的形式注入
        const nonce = /'nonce-([-+/=\w]+)'/.exec(value);
        if (nonce && nonce[1]) {
          code = [
            CODE_PREFIX,
            `script.nonce = "${nonce[1]}";`,
            `script.innerText = code`,
            CODE_SUFFIX,
          ].join("\n");
        }
        const onUpdate = (_: number, changeInfo: chrome.tabs.TabChangeInfo) => {
          if (changeInfo.status !== "loading") return void 0;
          // https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript
          cross.tabs
            .executeScript(res.tabId, {
              allFrames: false,
              code: code,
              runAt: "document_start",
              frameId: res.frameId,
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
