import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { WebSite } from "../types/website";
import { EVENTS_TYPE, EventBus } from "../utils/bus";
import style from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import dom from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, COPY_BUTTON_STYLE, STYLE_ID } from "../utils/styles";
import { logger } from "@/utils/logger";
import { delayExecute } from "../utils/delay";
import { PAGE_LOADED } from "copy/src/constant/event";

const init = () => {
  const el = <HTMLDivElement>document.querySelector("#j_select");
  el && el.click();
};

const onMouseUp = (event: MouseEvent) => {
  const handler = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const text = window.docinReader?.st || "";
    logger.info("SELECT", text);
    if (text) {
      dom.onCopy(text, event);
    } else {
      dom.hide();
    }
  };
  setTimeout(handler, 100);
};

export const DocIn: WebSite = {
  regexp: /www\.docin\.com/,
  start(type) {
    if (type === COPY_TYPE) {
      delayExecute(init, PAGE_LOADED);
      style.insertCSS(
        STYLE_ID,
        AUTO_USER_SELECT + ALLOW_PAINT + COPY_BUTTON_STYLE + ".copy-tips{display:none !important;} "
      );
      EventBus.on(EVENTS_TYPE.MOUSE_UP_CAPTURE, onMouseUp);
      EventBus.on(EVENTS_TYPE.COPY_CAPTURE, stopNativePropagation);
      EventBus.on(EVENTS_TYPE.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.on(EVENTS_TYPE.SELECT_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.on(EVENTS_TYPE.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.on(EVENTS_TYPE.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
  close(type) {
    if (type === COPY_TYPE) {
      dom.destroy();
      style.removeCSS(STYLE_ID);
      EventBus.off(EVENTS_TYPE.MOUSE_UP_CAPTURE, onMouseUp);
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
