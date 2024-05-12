import type { EventReflect, Object, String } from "@/utils/types";
import type { POPUP_TO_CONTENT_REQUEST } from "./request";

export const PC_QUERY_STATE_ENUM = {
  COPY: "COPY",
  MENU: "MENU",
  KEYBOARD: "KEYBOARD",
  COPY_ONCE: "COPY_ONCE",
  MENU_ONCE: "MENU_ONCE",
  KEYBOARD_ONCE: "KEYBOARD_ONCE",
} as const;

export type PCQueryStateType = Object.Values<typeof PC_QUERY_STATE_ENUM>;

type EventMap = {
  [POPUP_TO_CONTENT_REQUEST.QUERY_STATE]: { [K in PCQueryStateType]: boolean };
};

export type PCResponseType = EventReflect.Tuple<String.Map<keyof EventMap>, EventMap>;
