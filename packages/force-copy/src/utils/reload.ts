import { CWBridge } from "@/bridge/content-worker";
import { cross } from "./global";
import { logger } from "./logger";

export const RELOAD_APP = "RELOAD_APP";

export const onReceiveReloadMsg = () => {
  if (__DEV__) {
    try {
      const ws = new WebSocket("ws://localhost:3333");
      // 收到消息即重载
      ws.onmessage = () => {
        try {
          CWBridge.postToWorker({ type: CWBridge.REQUEST.RELOAD, payload: null });
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
  if (__DEV__ && msg === RELOAD_APP) {
    cross.runtime.reload();
    logger.warning("RELOAD SUCCESS");
  }
};
