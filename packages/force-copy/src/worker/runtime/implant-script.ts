import { URL_MATCH } from "@/utils/constant";
import { cross } from "@/utils/global";
import { logger } from "@/utils/logger";

export const implantScript = () => {
  /**  RUN INJECT SCRIPT IN DOCUMENT START **/
  if (process.env.PLATFORM === "chromium") {
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
        if (tabId && cross.tabs.executeScript) {
          cross.tabs.executeScript(tabId, {
            allFrames: true,
            file: "/" + process.env.INJECT_FILE + ".js",
            runAt: "document_start",
          });
        }
      }
    });
  }
};
