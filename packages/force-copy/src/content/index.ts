import { PCBridge } from "@/bridge/popup-content";
import { sendReloadMsg } from "../utils/reload";
import { implantScript } from "./runtime/implant-script";
import { onPopupMessage } from "./runtime/popup-message";
import { LOG_LEVEL, logger } from "@/utils/logger";

(() => {
  if (process.env.NODE_ENV === "development") {
    sendReloadMsg();
    logger.setLevel(LOG_LEVEL.INFO);
  }
  implantScript();
  PCBridge.onPopupMessage(onPopupMessage);
})();
