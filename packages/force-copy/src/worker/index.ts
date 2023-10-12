import { cross } from "@/utils/global";
import { LOG_LEVEL, logger } from "@/utils/logger";
import { reloadApp } from "@/utils/reload";

if (process.env.NODE_ENV === "development") {
  logger.setLevel(LOG_LEVEL.INFO);
  cross.runtime.onMessage.addListener(request => {
    reloadApp(request);
  });
}

// RUN INJECT SCRIPT IN DOCUMENT START
// https://bugs.chromium.org/p/chromium/issues/detail?id=634381
// https://stackoverflow.com/questions/75495191/chrome-extension-manifest-v3-how-to-use-window-addeventlistener
