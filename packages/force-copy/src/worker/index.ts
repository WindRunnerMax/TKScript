import { LOG_LEVEL, logger } from "@/utils/logger";
import { reloadApp } from "@/utils/reload";

if (process.env.NODE_ENV === "development") {
  logger.setLevel(LOG_LEVEL.INFO);
  chrome.runtime.onMessage.addListener(request => {
    reloadApp(request);
  });
}
