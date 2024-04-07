import { styles } from "copy-currency/src/utils";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import type { WebSite } from "../types/website";
import { EVENTS_ENUM, EventBus } from "../utils/bus";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import { STYLE_ID, AUTO_USER_SELECT } from "../utils/styles";

export const Basic: WebSite = {
  regexp: /.*/,
  start(type) {
    if (type === COPY_TYPE) {
      styles.insertCSS(STYLE_ID, AUTO_USER_SELECT);
      EventBus.on(EVENTS_ENUM.COPY_CAPTURE, stopNativePropagation);
      EventBus.on(EVENTS_ENUM.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.on(EVENTS_ENUM.SELECT_START_CAPTURE, stopNativePropagation);
      EventBus.on(EVENTS_ENUM.TOUCH_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.on(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.on(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
  close(type) {
    if (type === COPY_TYPE) {
      styles.removeCSS(STYLE_ID);
      EventBus.off(EVENTS_ENUM.COPY_CAPTURE, stopNativePropagation);
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.off(EVENTS_ENUM.SELECT_START_CAPTURE, stopNativePropagation);
      EventBus.off(EVENTS_ENUM.TOUCH_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.off(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
};
