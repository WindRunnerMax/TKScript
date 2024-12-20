import type { Reflex } from "@/utils/types";
import { MARK } from "./constant";

const PC_REQUEST_TYPE = [
  "COPY_TYPE",
  "KEYBOARD_TYPE",
  "CONTEXT_MENU_TYPE",
  "QUERY_STATE",
  "DEBUG_MOUSE_EVENT",
  "DEBUG_FOCUS_EVENT",
  "DEBUG_EDITABLE",
  "DEBUG_PASTE_EVENT",
] as const;

export const POPUP_TO_CONTENT_REQUEST = PC_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {} as { [K in typeof PC_REQUEST_TYPE[number]]: `__${K}__${typeof MARK}__` }
);

type EventMap = {
  [POPUP_TO_CONTENT_REQUEST.COPY_TYPE]: { checked: boolean; once: boolean };
  [POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE]: { checked: boolean; once: boolean };
  [POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE]: { checked: boolean; once: boolean };
  [POPUP_TO_CONTENT_REQUEST.QUERY_STATE]: null;
  [POPUP_TO_CONTENT_REQUEST.DEBUG_MOUSE_EVENT]: null;
  [POPUP_TO_CONTENT_REQUEST.DEBUG_FOCUS_EVENT]: null;
  [POPUP_TO_CONTENT_REQUEST.DEBUG_EDITABLE]: null;
  [POPUP_TO_CONTENT_REQUEST.DEBUG_PASTE_EVENT]: null;
};

export type PCRequestType = Reflex.Tuple<EventMap>;
