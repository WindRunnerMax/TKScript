import { cross } from "@/utils/global";
import type { CWRequestType } from "./request";
import { CONTENT_TO_WORKER_REQUEST } from "./request";
import { MARK } from "./constant";

export class CWBridge {
  public static readonly REQUEST = CONTENT_TO_WORKER_REQUEST;

  static async postToWorker(data: CWRequestType) {
    return new Promise<null>(resolve => {
      if (cross.runtime.id) {
        cross.runtime.sendMessage(data).then(resolve);
      } else {
        resolve(null);
      }
    });
  }

  static onContentMessage(cb: (data: CWRequestType, sender: chrome.runtime.MessageSender) => null) {
    const handler = (
      message: CWRequestType,
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

  static isCWRequestType(data: CWRequestType): data is CWRequestType {
    return data && data.type && data.type.endsWith(`__${MARK}__`);
  }
}
