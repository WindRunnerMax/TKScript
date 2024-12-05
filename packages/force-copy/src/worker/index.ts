import { LOG_LEVEL, logger } from "@/utils/logger";
import { importScript } from "./runtime/script";
import { CWBridge } from "@/bridge/content-worker";
import { onContentMessage } from "./channel/content";
import { initializeEvents } from "./runtime/initialize";

(() => {
  if (__DEV__) {
    logger.setLevel(LOG_LEVEL.INFO);
  }
  importScript();
  initializeEvents();
  CWBridge.onContentMessage(onContentMessage);
})();
