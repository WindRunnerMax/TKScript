import { EventBus as AbstractEventBus, Fn } from "laser-utils";

const EVENTS = [
  "MOUSE_UP_CAPTURE",
  "MOUSE_DOWN_CAPTURE",
  "MOUSE_UP_BUBBLE",
  "MOUSE_DOWN_BUBBLE",
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
  }
}

export const EventBus = new AbstractEventBus();
