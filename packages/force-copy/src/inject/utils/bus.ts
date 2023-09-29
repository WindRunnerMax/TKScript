import { ALL_ACTION_TYPE } from "@/utils/constant";
import { EventBus as AbstractEventBus } from "laser-utils";

const EVENTS = [
  "MOUSE_UP_CAPTURE",
  "MOUSE_DOWN_CAPTURE",
  "MOUSE_UP_BUBBLE",
  "MOUSE_DOWN_BUBBLE",
  "OPEN_ACTION",
  "CLOSE_ACTION",
  "OPEN_ONCE_ACTION",
  "COPY_CAPTURE",
  "KEY_BOARD_CAPTURE",
  "CONTEXT_MENU_CAPTURE",
  "SELECT_START_CAPTURE",
] as const;

export const EVENTS_TYPE = EVENTS.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in typeof EVENTS[number]]: `__${K}__` }
);

declare module "laser-utils" {
  interface EventBusType {
    [EVENTS_TYPE.MOUSE_UP_CAPTURE]: MouseEvent;
    [EVENTS_TYPE.MOUSE_DOWN_CAPTURE]: MouseEvent;
    [EVENTS_TYPE.MOUSE_UP_BUBBLE]: MouseEvent;
    [EVENTS_TYPE.MOUSE_DOWN_BUBBLE]: MouseEvent;
    [EVENTS_TYPE.OPEN_ACTION]: ALL_ACTION_TYPE;
    [EVENTS_TYPE.CLOSE_ACTION]: ALL_ACTION_TYPE;
    [EVENTS_TYPE.OPEN_ONCE_ACTION]: ALL_ACTION_TYPE;
    [EVENTS_TYPE.COPY_CAPTURE]: Event;
    [EVENTS_TYPE.KEY_BOARD_CAPTURE]: KeyboardEvent;
    [EVENTS_TYPE.CONTEXT_MENU_CAPTURE]: Event;
    [EVENTS_TYPE.SELECT_START_CAPTURE]: Event;
  }
}

export const EventBus = new AbstractEventBus();