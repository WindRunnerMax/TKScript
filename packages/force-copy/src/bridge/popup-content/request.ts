const PC_REQUEST_TYPE = ["COPY_TYPE", "KEYBOARD_TYPE", "CONTEXT_MENU_TYPE", "QUERY_STATE"] as const;
export const POPUP_TO_CONTENT_REQUEST = PC_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__PC__` }),
  {} as { [K in typeof PC_REQUEST_TYPE[number]]: `__${K}__PC__` }
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
