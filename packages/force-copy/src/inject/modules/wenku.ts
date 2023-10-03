import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { WebSite } from "../types/website";
import { EVENTS_TYPE, EventBus } from "../utils/bus";
import style from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import dom from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, COPY_BUTTON_STYLE, STYLE_ID } from "../utils/styles";
import { logger } from "@/utils/logger";

let preSelectedText = "";
let curSelectedText = "";

const onMouseDown = () => {
  dom.hide(false);
};
const onMouseUp = (event: MouseEvent) => {
  try {
    const elements = document.querySelectorAll("#app > div");
    for (const item of elements) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const vue = item.__vue__;
      if (vue) {
        const text = vue.$store.getters["readerPlugin/selectedTextTrim"];
        text && (curSelectedText = text);
        break;
      }
    }
  } catch (error) {
    logger.warning("GET TEXT FAIL", error);
  }
  if (!curSelectedText) {
    const result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
    result && result[1] && (curSelectedText = result[1]);
  }
  logger.info("SELECT", curSelectedText);
  if (curSelectedText && preSelectedText !== curSelectedText) {
    dom.onCopy(curSelectedText, event);
  }
  preSelectedText = curSelectedText;
};

export const Wenku: WebSite = {
  regexp: /wenku\.baidu\.com/,
  start(type) {
    if (type === COPY_TYPE) {
      style.insertCSS(
        STYLE_ID,
        AUTO_USER_SELECT +
          ALLOW_PAINT +
          COPY_BUTTON_STYLE +
          "#reader-helper{display:none !important;} "
      );
      EventBus.on(EVENTS_TYPE.MOUSE_UP_BUBBLE, onMouseUp);
      EventBus.on(EVENTS_TYPE.MOUSE_DOWN_CAPTURE, onMouseDown);
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
      EventBus.off(EVENTS_TYPE.MOUSE_UP_BUBBLE, onMouseUp);
      EventBus.off(EVENTS_TYPE.MOUSE_DOWN_CAPTURE, onMouseDown);
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
