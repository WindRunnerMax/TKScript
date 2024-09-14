export const COPY_TYPE = "__COPY__";
export const KEYBOARD_TYPE = "__KEYBOARD_TYPE__";
export const CONTEXT_MENU_TYPE = "__CONTEXT_MENU_TYPE__";
export const URL_MATCH = ["https://*/*", "http://*/*", "file://*/*"];

export type ActionType = typeof COPY_TYPE | typeof KEYBOARD_TYPE | typeof CONTEXT_MENU_TYPE;
