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
        cross.action.setBadgeText({ text: payload.toString(), tabId: sender.tab.id });
        cross.action.setBadgeBackgroundColor({ color: "#4e5969", tabId: sender.tab.id });
      }
      break;
    }
  }
  return null;
};
