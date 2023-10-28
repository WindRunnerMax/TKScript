import { PCBridge } from "@/bridge/popup-content";
import { onReceiveReloadMsg } from "../utils/reload";
import { onPopupMessage } from "./runtime/popup-message";
import { LOG_LEVEL, logger } from "@/utils/logger";

(() => {
  if (__DEV__) {
    self === top && onReceiveReloadMsg();
    logger.setLevel(LOG_LEVEL.INFO);
  }
  logger.info("Content Script Loaded");
  PCBridge.onPopupMessage(onPopupMessage);
})();
