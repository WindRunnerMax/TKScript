import { PCBridge } from "@/bridge/popup-content";
import { onReceiveReloadMsg } from "../utils/reload";
import { onPopupMessage } from "./runtime/popup-message";
import { LOG_LEVEL, logger } from "@/utils/logger";
import { initializeWorker } from "./runtime/initialize-worker";
import { isInIframe } from "@/utils/is";
import { implantScript } from "./runtime/implant-script";

(() => {
  if (__DEV__) {
    !isInIframe && onReceiveReloadMsg();
    logger.setLevel(LOG_LEVEL.INFO);
  }
  logger.info("Content Script Loaded");
  implantScript();
  !isInIframe && initializeWorker();
  PCBridge.onPopupMessage(onPopupMessage);
})();
