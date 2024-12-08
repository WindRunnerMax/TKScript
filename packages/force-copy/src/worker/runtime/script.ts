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
  // 使用 cross.tabs.executeScript 得到的 Window 是 Content Window
  // 此时就必须要使用 Inject Script 的方式才能正常注入脚本
  // 然而这种方式就会受到 Content Security Policy 策略的限制
  // https://github.com/violentmonkey/violentmonkey/issues/1001
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onHeadersReceived
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onResponseStarted
  chrome.webRequest.onResponseStarted.addListener(
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
        // CSP 不支持多个 nonce, 但可以配置多个 sha-hash
        // 这里的 hash 会在编译时计算并替换资源 'sha256-${CSP-HASH}'
        // 但对 CSP 策略修改存在问题, 这里仅读取并尝试注入, 而不直接增加 hash
        // 例如 'self' => ok / 'self'+'hash' => error 宽松到严格结构问题
        // 此外即使覆盖原有的响应头, 扩展的 CSP 总是更倾向于更加严格的模式
        // 在实际测试中, 仅有完全抹除标头时, 才可以实际解决多个扩展冲突的问题
        // ...
        // 存在 CSP 时尝试直接在 Content Script 中执行
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
            `script.innerText = code;`,
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
      // onHeadersReceived 仅读取响应头而不修改
      return void 0;
    },
    { urls: URL_MATCH, types: ["main_frame", "sub_frame"] },
    ["responseHeaders"]
  );
  // #ENDIF
};
