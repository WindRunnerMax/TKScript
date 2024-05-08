import { cross } from "@/utils/global";
import type { PWRequestType } from "./request";
import { POPUP_TO_WORKER_REQUEST } from "./request";

export class PWBridge {
  public static readonly REQUEST = POPUP_TO_WORKER_REQUEST;
  public static readonly RESPONSE = null;

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
}
