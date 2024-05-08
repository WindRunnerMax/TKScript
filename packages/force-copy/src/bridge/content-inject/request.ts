import type { CIExecutionType } from "./state";

const CI_REQUEST_ENUM = ["COPY_TYPE", "KEYBOARD_TYPE", "CONTEXT_MENU_TYPE"] as const;
export const CONTENT_TO_INJECT_REQUEST = CI_REQUEST_ENUM.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__CI__` }),
  {} as { [K in typeof CI_REQUEST_ENUM[number]]: `__${K}__CI__` }
);

export type CIRequestType =
  | {
      type: typeof CONTENT_TO_INJECT_REQUEST.COPY_TYPE;
      payload: CIExecutionType;
    }
  | {
      type: typeof CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE;
      payload: CIExecutionType;
    }
  | {
      type: typeof CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE;
      payload: CIExecutionType;
    };
