import { cross } from "@/utils/global";
import { PCQueryStateType } from "./constant";
import { isEmptyValue } from "laser-utils";
import { logger } from "@/utils/logger";
import { URL_MATCH } from "@/utils/constant";

const PC_REQUEST_TYPE = ["COPY_TYPE", "KEYBOARD_TYPE", "CONTEXT_MENU_TYPE", "QUERY_STATE"] as const;
export const POPUP_TO_CONTENT_REQUEST = PC_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in typeof PC_REQUEST_TYPE[number]]: `__${K}__` }
);

const PC_RESPONSE_TYPE = ["STATE", "PLACE_HOLDER"] as const;
export const POPUP_TO_CONTENT_RESPONSE = PC_RESPONSE_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in typeof PC_RESPONSE_TYPE[number]]: `__${K}__` }
);

export type PCRequestType =
  | {
      type: typeof POPUP_TO_CONTENT_REQUEST.COPY_TYPE;
      payload: { checked: boolean; once: boolean };
    }
  | {
      type: typeof POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE;
      payload: { checked: boolean; once: boolean };
    }
  | {
      type: typeof POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE;
      payload: { checked: boolean; once: boolean };
    }
  | {
      type: typeof POPUP_TO_CONTENT_REQUEST.QUERY_STATE;
    };

export type PCResponseType = {
  type: typeof POPUP_TO_CONTENT_RESPONSE.STATE;
  payload: { [K in PCQueryStateType]: boolean };
};

export class PCBridge {
  public static readonly REQUEST = POPUP_TO_CONTENT_REQUEST;
  public static readonly RESPONSE = POPUP_TO_CONTENT_RESPONSE;

  static async postToContent(data: PCRequestType) {
    return new Promise<PCResponseType | null>(resolve => {
      cross.tabs
        .query({ active: true, currentWindow: true })
        .then(tabs => {
          const tab = tabs[0];
          const tabId = tab && tab.id;
          const tabURL = tab && tab.url;
          if (tabURL && !URL_MATCH.some(match => new RegExp(match).test(tabURL))) {
            resolve(null);
            return void 0;
          }
          if (!isEmptyValue(tabId)) {
            cross.tabs.sendMessage(tabId, data).then(resolve);
          } else {
            resolve(null);
          }
        })
        .catch(error => {
          logger.warning("Send Message Error", error);
        });
    });
  }

  static onPopupMessage(cb: (data: PCRequestType) => void | PCResponseType) {
    const handler = (
      message: PCRequestType,
      _: chrome.runtime.MessageSender,
      sendResponse: (response?: PCResponseType | null) => void
    ) => {
      const rtn = cb(message);
      rtn && sendResponse(rtn);
    };
    cross.runtime.onMessage.addListener(handler);
    return () => {
      cross.runtime.onMessage.removeListener(handler);
    };
  }
}
