export const CONTENT_INJECT_ACTION = {
  COPY: "___COPY",
  CONTEXT_MENU: "___CONTEXT_MENU",
  KEY_DOWN: "___KEY_DOWN",
} as const;

type ContentInjectAction = {
  type:
    | typeof CONTENT_INJECT_ACTION.CONTEXT_MENU
    | typeof CONTENT_INJECT_ACTION.KEY_DOWN
    | typeof CONTENT_INJECT_ACTION.COPY;
  payload: boolean;
};

const UNION_KEY = "___CONTENT_INJECT_UNION_KEY";
type WithTagAction<T> = T & { UNION_KEY: typeof UNION_KEY };

export class PopupContentBridge {
  static async postMessage(data: ContentInjectAction) {
    window.postMessage({ ...data, UNION_KEY }, location.origin);
  }

  static onMessage(cb: (data: ContentInjectAction) => void) {
    const handler = (event: MessageEvent<WithTagAction<ContentInjectAction>>) => {
      if (event.origin === location.origin) {
        const data = event.data;
        if (data.UNION_KEY === UNION_KEY) cb(data);
      }
    };
    window.addEventListener("message", handler);
    return () => {
      window.removeEventListener("message", handler);
    };
  }
}

// 1. window.addEventListener + window.postMessage
// 2. document.addEventListener + document.dispatchEvent + CustomEvent
