import { URL_MATCH } from "@/utils/constant";
import { cross } from "@/utils/global";
import { logger } from "@/utils/logger";
import { NOOP } from "../utils/constant";

export const initializeEvents = () => {
  const onSetup = () => {
    logger.info("Register Inject Scripts On Setup");
    cross.tabs.query({}).then(tabs => {
      for (const tab of tabs) {
        const tabId = tab && tab.id;
        const tabURL = tab && tab.url;
        if (!tabId || !tabURL) continue;
        if (!URL_MATCH.some(match => new RegExp(match).test(tabURL))) {
          continue;
        }
        // #IFDEF CHROMIUM
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/executeScript
        cross.scripting.executeScript({
          target: { tabId: tabId, allFrames: true },
          files: ["content.js"],
          injectImmediately: true,
        });
        cross.scripting.executeScript({
          target: { tabId: tabId, allFrames: true },
          files: [process.env.INJECT_FILE + ".js"],
          injectImmediately: true,
          world: "MAIN",
        });
        // #ENDIF
        // #IFDEF GECKO
        // https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API/tabs/executeScript
        cross.tabs
          .executeScript(tabId, {
            allFrames: true,
            file: process.env.INJECT_FILE + ".js",
          })
          .catch(NOOP);
        cross.tabs
          .executeScript(tabId, {
            allFrames: true,
            file: "content.js",
          })
          .catch(NOOP);
        // #ENDIF
      }
    });
  };
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onInstalled
  cross.runtime.onInstalled.addListener(onSetup);
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/management/onEnabled
  cross.management.onEnabled.addListener(onSetup);
};
