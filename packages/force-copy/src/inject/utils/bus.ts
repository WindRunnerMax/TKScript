import type { ActionType } from "@/utils/constant";
import { EventBus as AbstractEventBus } from "laser-utils";

const EVENTS_TYPE = [
  "MOUSE_UP_CAPTURE",
  "MOUSE_DOWN_CAPTURE",
  "MOUSE_UP_BUBBLE",
  "MOUSE_DOWN_BUBBLE",
  "DOM_LOADED",
  "PAGE_LOADED",
  "OPEN_ACTION",
  "CLOSE_ACTION",
  "OPEN_ONCE_ACTION",
  "COPY_CAPTURE",
  "KEY_BOARD_CAPTURE",
  "CONTEXT_MENU_CAPTURE",
  "SELECT_START_CAPTURE",
  "TOUCH_START_CAPTURE",
  "FOCUS_CAPTURE",
  "BLUR_CAPTURE",
  "MOUSE_MOVE_CAPTURE",
  "TOUCH_MOVE_CAPTURE",
  "TOUCH_END_CAPTURE",
] as const;

export const EVENTS_ENUM = EVENTS_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in typeof EVENTS_TYPE[number]]: `__${K}__` }
);

interface EventBusParams {
  [EVENTS_ENUM.MOUSE_UP_CAPTURE]: MouseEvent;
  [EVENTS_ENUM.MOUSE_DOWN_CAPTURE]: MouseEvent;
  [EVENTS_ENUM.MOUSE_UP_BUBBLE]: MouseEvent;
  [EVENTS_ENUM.MOUSE_DOWN_BUBBLE]: MouseEvent;
  [EVENTS_ENUM.MOUSE_MOVE_CAPTURE]: MouseEvent;
  [EVENTS_ENUM.DOM_LOADED]: Event;
  [EVENTS_ENUM.PAGE_LOADED]: Event;
  [EVENTS_ENUM.OPEN_ACTION]: ActionType;
  [EVENTS_ENUM.CLOSE_ACTION]: ActionType;
  [EVENTS_ENUM.OPEN_ONCE_ACTION]: ActionType;
  [EVENTS_ENUM.COPY_CAPTURE]: Event;
  [EVENTS_ENUM.KEY_BOARD_CAPTURE]: KeyboardEvent;
  [EVENTS_ENUM.CONTEXT_MENU_CAPTURE]: Event;
  [EVENTS_ENUM.SELECT_START_CAPTURE]: Event;
  [EVENTS_ENUM.TOUCH_START_CAPTURE]: TouchEvent;
  [EVENTS_ENUM.FOCUS_CAPTURE]: FocusEvent;
  [EVENTS_ENUM.BLUR_CAPTURE]: FocusEvent;
  [EVENTS_ENUM.TOUCH_MOVE_CAPTURE]: TouchEvent;
  [EVENTS_ENUM.TOUCH_END_CAPTURE]: TouchEvent;
}

declare module "laser-utils/dist/es/event-bus" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface EventBusType extends EventBusParams {}
}

export const EventBus = new AbstractEventBus();
