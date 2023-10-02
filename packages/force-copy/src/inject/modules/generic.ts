import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { WebSite } from "../types/website";
import { EVENTS_TYPE, EventBus } from "../utils/bus";
import style from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";

const STYLE_ID = "__FORCE_COPY_STYLE__";

export const Generic: WebSite = {
  regexp: /.*/,
  start(type) {
    if (type === COPY_TYPE) {
      EventBus.on(EVENTS_TYPE.COPY_CAPTURE, stopNativePropagation);
      EventBus.on(EVENTS_TYPE.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.on(EVENTS_TYPE.SELECT_START_CAPTURE, stopNativePropagation);
      style.insertCSS(
        STYLE_ID,
        "*{user-select: auto !important;-webkit-user-select: auto !important;}"
      );
    } else if (type === KEYBOARD_TYPE) {
      EventBus.on(EVENTS_TYPE.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.on(EVENTS_TYPE.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
  close(type) {
    if (type === COPY_TYPE) {
      style.removeCSS(STYLE_ID);
      EventBus.off(EVENTS_TYPE.COPY_CAPTURE, stopNativePropagation);
      EventBus.off(EVENTS_TYPE.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.off(EVENTS_TYPE.SELECT_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.off(EVENTS_TYPE.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.off(EVENTS_TYPE.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
};
