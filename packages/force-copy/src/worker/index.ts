import { cross } from "@/utils/global";
import { LOG_LEVEL, logger } from "@/utils/logger";
import { reloadApp } from "@/utils/reload";
import { implantScript } from "./runtime/implant-script";

(() => {
  if (__DEV__) {
    logger.setLevel(LOG_LEVEL.INFO);
    cross.runtime.onMessage.addListener(request => {
      reloadApp(request);
    });
  }
  implantScript();
})();
