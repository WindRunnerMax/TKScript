import { cross } from "./global";
import { logger } from "./logger";

export const RELOAD_APP = "RELOAD_APP";

export const onReceiveReloadMsg = () => {
  if (process.env.NODE_ENV === "development") {
    try {
      const ws = new WebSocket("ws://localhost:3333");
      // 收到消息即重载
      ws.onmessage = () => {
        try {
          cross.runtime.id && cross.runtime.sendMessage(RELOAD_APP);
        } catch (error) {
          logger.warning("SEND MESSAGE ERROR", error);
        }
      };
    } catch (error) {
      logger.warning("CONNECT ERROR", error);
    }
  }
};

export const reloadApp = (msg: unknown) => {
  if (process.env.NODE_ENV === "development" && msg === RELOAD_APP) {
    cross.runtime.reload();
    logger.warning("RELOAD SUCCESS");
  }
};
