import { LOG_LEVEL, logger } from "@/utils/logger";
import { implantScript } from "./runtime/implant-script";
import { CWBridge } from "@/bridge/content-worker";
import { onContentMessage } from "./runtime/content-message";

(() => {
  if (__DEV__) {
    logger.setLevel(LOG_LEVEL.INFO);
  }
  implantScript();
  CWBridge.onContentMessage(onContentMessage);
})();
