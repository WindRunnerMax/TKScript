import { LOG_LEVEL, logger } from "@/utils/logger";
import { implantScript } from "./runtime/script";
import { CWBridge } from "@/bridge/content-worker";
import { onContentMessage } from "./channel/content";

(() => {
  if (__DEV__) {
    logger.setLevel(LOG_LEVEL.INFO);
  }
  implantScript();
  CWBridge.onContentMessage(onContentMessage);
})();
