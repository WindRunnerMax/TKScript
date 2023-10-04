import { cross } from "@/utils/global";
import { LOG_LEVEL, logger } from "@/utils/logger";
import { reloadApp } from "@/utils/reload";

if (process.env.NODE_ENV === "development") {
  logger.setLevel(LOG_LEVEL.INFO);
  cross.runtime.onMessage.addListener(request => {
    reloadApp(request);
  });
}
