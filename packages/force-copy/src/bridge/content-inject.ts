import { decodeJSON, encodeJSON } from "laser-utils";
import { CI_EXECUTION_KEY_TYPE } from "./constant";

const EVENT_TYPE = process.env.EVENT_TYPE;

const CI_REQUEST_TYPE = ["COPY_TYPE", "KEYBOARD_TYPE", "CONTEXT_MENU_TYPE"] as const;
export const CONTENT_TO_INJECT_REQUEST = CI_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in typeof CI_REQUEST_TYPE[number]]: `__${K}__` }
);

export type CI_REQUEST =
  | {
      type: typeof CONTENT_TO_INJECT_REQUEST.COPY_TYPE;
      payload: CI_EXECUTION_KEY_TYPE;
    }
  | {
      type: typeof CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE;
      payload: CI_EXECUTION_KEY_TYPE;
    }
  | {
      type: typeof CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE;
      payload: CI_EXECUTION_KEY_TYPE;
    };

export class CIBridge {
  static postToInject(data: CI_REQUEST) {
    window.dispatchEvent(new CustomEvent(EVENT_TYPE, { detail: encodeJSON(data) }));
  }

  static onContentMessage(cb: (data: CI_REQUEST) => void) {
    const handler = (event: CustomEvent<string>) => {
      const data = decodeJSON<CI_REQUEST>(event.detail);
      if (data && data.type && data.payload) {
        cb(data);
      }
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.addEventListener(EVENT_TYPE, handler);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window.removeEventListener(EVENT_TYPE, handler);
    };
  }
}
