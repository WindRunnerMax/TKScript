import { PC_QUERY_STATE_KEY_TYPE } from "./constant";

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

export type PC_REQUEST =
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

export type PC_RESPONSE = {
  type: typeof POPUP_TO_CONTENT_RESPONSE.STATE;
  payload: { [K in PC_QUERY_STATE_KEY_TYPE]: boolean };
};

export class PCBridge {
  static async postToContent(data: PC_REQUEST) {
    return new Promise<PC_RESPONSE | null>(resolve => {
      chrome.tabs.query({ active: true, currentWindow: true }).then(tabs => {
        const tabId = tabs[0] && tabs[0].id;
        if (tabId) {
          chrome.tabs.sendMessage(tabId, data).then(resolve);
        } else {
          resolve(null);
        }
      });
    });
  }

  static onPopupMessage(cb: (data: PC_REQUEST) => void | PC_RESPONSE) {
    const handler = (
      message: PC_REQUEST,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: PC_RESPONSE | null) => void
    ) => {
      const rtn = cb(message);
      sendResponse(rtn || null);
    };
    chrome.runtime.onMessage.addListener(handler);
    return () => {
      chrome.runtime.onMessage.removeListener(handler);
    };
  }
}
