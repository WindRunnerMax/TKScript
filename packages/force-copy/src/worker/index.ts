import { LOG_LEVEL, logger } from "@/utils/logger";
import { importWorkerScript } from "./runtime/script";
import { CWBridge } from "@/bridge/content-worker";
import { onContentMessage } from "./channel/content";
import { initializeEvents } from "./runtime/initialize";

(() => {
  if (__DEV__) {
    logger.setLevel(LOG_LEVEL.INFO);
  }
  initializeEvents();
  importWorkerScript();
  CWBridge.onContentMessage(onContentMessage);
})();
