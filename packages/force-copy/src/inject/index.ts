import "../utils/reload";
import {
  CONTEXT_MENU,
  COPY,
  KEY_DOWN,
  MOUSE_DOWN,
  MOUSE_UP,
  SELECT_START,
} from "copy/src/constant/event";
import { EVENTS_TYPE, EventBus } from "./utils/bus";
import { State } from "./types/state";
import { storage } from "laser-utils";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";

(async () => {
  const state: State = {
    COPY: !!storage.local.get<boolean>(COPY_TYPE),
    KEYBOARD: !!storage.local.get<boolean>(KEYBOARD_TYPE),
    CONTEXT_MENU: !!storage.local.get<boolean>(CONTEXT_MENU_TYPE),
  };
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
})();
