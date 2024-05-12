import type { Object } from "@/utils/types";
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

export type PCResponseType = {
  type: typeof POPUP_TO_CONTENT_REQUEST.QUERY_STATE;
  payload: { [K in PCQueryStateType]: boolean };
};
