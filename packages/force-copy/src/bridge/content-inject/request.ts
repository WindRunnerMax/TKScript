import type { Reflex, Object } from "@/utils/types";
import { MARK } from "./constant";

const CI_REQUEST_ENUM = [
  "COPY_TYPE",
  "KEYBOARD_TYPE",
  "CONTEXT_MENU_TYPE",
  "DEBUG_MOUSE_EVENT",
  "DEBUG_FOCUS_EVENT",
  "DEBUG_EDITABLE",
  "DEBUG_PASTE",
] as const;

export const CONTENT_TO_INJECT_REQUEST = CI_REQUEST_ENUM.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {} as { [K in typeof CI_REQUEST_ENUM[number]]: `__${K}__${typeof MARK}__` }
);

export const CI_EXECUTION_ENUM = {
  START: "START",
  CLOSE: "CLOSE",
} as const;

export type CIExecutionType = Object.Values<typeof CI_EXECUTION_ENUM>;

export type EventMap = {
  [CONTENT_TO_INJECT_REQUEST.COPY_TYPE]: CIExecutionType;
  [CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE]: CIExecutionType;
  [CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE]: CIExecutionType;
  [CONTENT_TO_INJECT_REQUEST.DEBUG_MOUSE_EVENT]: null;
  [CONTENT_TO_INJECT_REQUEST.DEBUG_FOCUS_EVENT]: null;
  [CONTENT_TO_INJECT_REQUEST.DEBUG_EDITABLE]: null;
  [CONTENT_TO_INJECT_REQUEST.DEBUG_PASTE]: null;
};

export type CIRequestType = Reflex.Tuple<EventMap>;
