import { CWBridge, CWRequestType } from "@/bridge/content-worker";
import { cross } from "@/utils/global";
import { logger } from "@/utils/logger";
import { RELOAD_APP, reloadApp } from "@/utils/reload";

export const onContentMessage = (data: CWRequestType, sender: chrome.runtime.MessageSender) => {
  logger.info("Content Receive Popup Message", data);
  switch (data.type) {
    case CWBridge.REQUEST.RELOAD: {
      reloadApp(RELOAD_APP);
      break;
    }
    case CWBridge.REQUEST.SET_BADGE: {
      const { payload } = data;
      if (payload && sender.tab && sender.tab.id) {
        const tabId = sender.tab.id;
        let action: typeof cross.action | typeof cross.browserAction = cross.action;
        // #IFDEF GECKO
        action = cross.browserAction;
        // #ENDIF
        action.setBadgeText({ text: payload.toString(), tabId });
        action.setBadgeBackgroundColor({ color: "#4e5969", tabId });
      }
      break;
    }
  }
  return null;
};
