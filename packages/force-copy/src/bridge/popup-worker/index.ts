import { cross } from "@/utils/global";
import type { PWRequestType } from "./request";
import { POPUP_TO_WORKER_REQUEST } from "./request";
import { MARK } from "./constant";

export class PWBridge {
  public static readonly REQUEST = POPUP_TO_WORKER_REQUEST;

  static async postToWorker(data: PWRequestType) {
    return new Promise<null>(resolve => {
      if (cross.runtime.id) {
        cross.runtime.sendMessage(data).then(resolve);
      } else {
        resolve(null);
      }
    });
  }

  static onPopupMessage(cb: (data: PWRequestType, sender: chrome.runtime.MessageSender) => null) {
    const handler = (
      message: PWRequestType,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: null) => void
    ) => {
      const rtn = cb(message, sender);
      sendResponse(rtn || null);
    };
    cross.runtime.onMessage.addListener(handler);
    return () => {
      cross.runtime.onMessage.removeListener(handler);
    };
  }

  static isPWRequestType(data: PWRequestType): data is PWRequestType {
    return data && data.type && data.type.endsWith(`__${MARK}__`);
  }
}
