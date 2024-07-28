import {
  BLUR,
  CONTEXT_MENU,
  COPY,
  DOM_READY,
  FOCUS,
  FOCUS_IN,
  FOCUS_OUT,
  KEY_DOWN,
  MOUSE_DOWN,
  MOUSE_MOVE,
  MOUSE_UP,
  PAGE_LOADED,
  SELECT_START,
  TOUCH_END,
  TOUCH_MOVE,
  TOUCH_START,
} from "copy/src/constant/event";
import { EVENTS_ENUM, EventBus } from "./bus";

export const initBaseEvents = () => {
  window.addEventListener(MOUSE_UP, e => EventBus.emit(EVENTS_ENUM.MOUSE_UP_BUBBLE, e));
  window.addEventListener(MOUSE_DOWN, e => EventBus.emit(EVENTS_ENUM.MOUSE_DOWN_BUBBLE, e));
  window.addEventListener(MOUSE_UP, e => EventBus.emit(EVENTS_ENUM.MOUSE_UP_CAPTURE, e), true);
  window.addEventListener(MOUSE_DOWN, e => EventBus.emit(EVENTS_ENUM.MOUSE_DOWN_CAPTURE, e), true);
  window.addEventListener(COPY, e => EventBus.emit(EVENTS_ENUM.COPY_CAPTURE, e), true);
  window.addEventListener(KEY_DOWN, e => EventBus.emit(EVENTS_ENUM.KEY_BOARD_CAPTURE, e), true);
  window.addEventListener(
    CONTEXT_MENU,
    e => EventBus.emit(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, e),
    true
  );
  window.addEventListener(
    SELECT_START,
    e => EventBus.emit(EVENTS_ENUM.SELECT_START_CAPTURE, e),
    true
  );
  window.addEventListener(
    TOUCH_START,
    e => EventBus.emit(EVENTS_ENUM.TOUCH_START_CAPTURE, e),
    true
  );
  window.addEventListener(DOM_READY, e => EventBus.emit(EVENTS_ENUM.DOM_LOADED, e), true);
  window.addEventListener(PAGE_LOADED, e => EventBus.emit(EVENTS_ENUM.PAGE_LOADED, e), true);
  window.addEventListener(FOCUS, e => EventBus.emit(EVENTS_ENUM.FOCUS_CAPTURE, e), true);
  window.addEventListener(FOCUS_IN, e => EventBus.emit(EVENTS_ENUM.FOCUS_CAPTURE, e), true);
  window.addEventListener(BLUR, e => EventBus.emit(EVENTS_ENUM.BLUR_CAPTURE, e), true);
  window.addEventListener(FOCUS_OUT, e => EventBus.emit(EVENTS_ENUM.FOCUS_CAPTURE, e), true);
  window.addEventListener(MOUSE_MOVE, e => EventBus.emit(EVENTS_ENUM.MOUSE_MOVE_CAPTURE, e), true);
  window.addEventListener(TOUCH_MOVE, e => EventBus.emit(EVENTS_ENUM.TOUCH_MOVE_CAPTURE, e), true);
  window.addEventListener(TOUCH_END, e => EventBus.emit(EVENTS_ENUM.TOUCH_END_CAPTURE, e), true);
};

export const stopNativePropagation = (event: Event) => event.stopImmediatePropagation();

export const onCopyKeyboardHandler = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLocaleUpperCase() === "C") {
    stopNativePropagation(e);
  }
};
