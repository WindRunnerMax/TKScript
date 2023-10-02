import {
  CONTEXT_MENU,
  COPY,
  DOM_READY,
  KEY_DOWN,
  MOUSE_DOWN,
  MOUSE_UP,
  PAGE_LOADED,
  SELECT_START,
} from "copy/src/constant/event";
import { EVENTS_TYPE, EventBus } from "./bus";

export const initBaseEvents = () => {
  window.addEventListener(MOUSE_UP, e => EventBus.emit(EVENTS_TYPE.MOUSE_UP_BUBBLE, e));
  window.addEventListener(MOUSE_DOWN, e => EventBus.emit(EVENTS_TYPE.MOUSE_DOWN_BUBBLE, e));
  window.addEventListener(MOUSE_UP, e => EventBus.emit(EVENTS_TYPE.MOUSE_UP_CAPTURE, e), true);
  window.addEventListener(MOUSE_DOWN, e => EventBus.emit(EVENTS_TYPE.MOUSE_DOWN_CAPTURE, e), true);
  window.addEventListener(COPY, e => EventBus.emit(EVENTS_TYPE.COPY_CAPTURE, e), true);
  window.addEventListener(KEY_DOWN, e => EventBus.emit(EVENTS_TYPE.KEY_BOARD_CAPTURE, e), true);
  window.addEventListener(
    CONTEXT_MENU,
    e => EventBus.emit(EVENTS_TYPE.CONTEXT_MENU_CAPTURE, e),
    true
  );
  window.addEventListener(
    SELECT_START,
    e => EventBus.emit(EVENTS_TYPE.SELECT_START_CAPTURE, e),
    true
  );
  window.addEventListener(PAGE_LOADED, e => EventBus.emit(EVENTS_TYPE.LOADED, e), true);
  window.addEventListener(DOM_READY, e => EventBus.emit(EVENTS_TYPE.DOM_LOADED, e), true);
};

export const stopNativePropagation = (event: Event) => event.stopPropagation();
export const copyKeyboardHandler = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLocaleUpperCase() === "C") {
    stopNativePropagation(e);
  }
};
