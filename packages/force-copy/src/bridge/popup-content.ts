export const POPUP_CONTENT_ACTION = {
  COPY: "___COPY",
  MENU: "___MENU",
  KEYDOWN: "___KEYDOWN",
  QUERY_STATE: "___QUERY_STATE",
} as const;

export const QUERY_STATE_KEY = {
  STORAGE_COPY: "___STORAGE_COPY",
  STORAGE_MENU: "___STORAGE_MENU",
  STORAGE_KEYDOWN: "___STORAGE_KEYDOWN",
  SESSION_COPY: "___SESSION_COPY",
  SESSION_MENU: "___SESSION_MENU",
  SESSION_KEYDOWN: "___SESSION_KEYDOWN",
} as const;

export const POPUP_CONTENT_RTN = {
  STATE: "___STATE",
} as const;

export type PopupContentAction =
  | {
      type:
        | typeof POPUP_CONTENT_ACTION.MENU
        | typeof POPUP_CONTENT_ACTION.KEYDOWN
        | typeof POPUP_CONTENT_ACTION.COPY;
      payload: { checked: boolean; once: boolean };
    }
  | {
      type: typeof POPUP_CONTENT_ACTION.QUERY_STATE;
      payload: typeof QUERY_STATE_KEY[keyof typeof QUERY_STATE_KEY];
    };

type PopupContentRTN = {
  type: typeof POPUP_CONTENT_RTN[keyof typeof POPUP_CONTENT_RTN];
  payload: boolean;
};

export class PopupContentBridge {
  static async postMessage(data: PopupContentAction) {
    return new Promise<PopupContentRTN | null>(resolve => {
      chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const tabId = tabs[0] && tabs[0].id;
        if (tabId) {
          chrome.tabs.sendMessage(tabId, data).then(resolve);
          // https://developer.chrome.com/docs/extensions/reference/scripting/#runtime-functions
          // chrome.scripting.executeScript;
        } else {
          resolve(null);
        }
      });
    });
  }

  static onMessage(cb: (data: PopupContentAction) => void | PopupContentRTN) {
    const handler = (
      message: PopupContentAction,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: PopupContentRTN | null) => void
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
