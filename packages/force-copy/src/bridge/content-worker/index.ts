import { cross } from "@/utils/global";

const CW_REQUEST_TYPE = ["RELOAD", "SET_BADGE"] as const;
export const CONTENT_TO_WORKER_REQUEST = CW_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in typeof CW_REQUEST_TYPE[number]]: `__${K}__` }
);

export type CWRequestType =
  | {
      type: typeof CONTENT_TO_WORKER_REQUEST.RELOAD;
      payload: null;
    }
  | {
      type: typeof CONTENT_TO_WORKER_REQUEST.SET_BADGE;
      payload: number;
    };

export class CWBridge {
  public static readonly REQUEST = CONTENT_TO_WORKER_REQUEST;
  public static readonly RESPONSE = null;

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
}
