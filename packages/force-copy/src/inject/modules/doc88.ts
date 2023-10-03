import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { WebSite } from "../types/website";
import { EVENTS_TYPE, EventBus } from "../utils/bus";
import style from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import dom from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, COPY_BUTTON_STYLE, STYLE_ID } from "../utils/styles";
import { logger } from "@/utils/logger";
import { isString } from "laser-utils";

let isMouseDown = false;
let preSelectedText = "";
let curSelectedText = "";

const onMouseDownCapture = () => {
  isMouseDown = true;
  dom.hide(false);
};
const onMouseUpCapture = () => {
  isMouseDown = false;
};
const init = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.Config && (window.Config.vip = 1) && (window.Config.logined = 1);
    const hook = () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const api = window.Core.Annotation.api;
      const keys = Object.keys(api).filter(key => isString(api[key]));
      const duplication: Record<string, unknown> = {};
      keys.forEach(key => {
        duplication[key] = api[key];
        Object.defineProperty(api, key, {
          set: function (value) {
            duplication[key] = value;
            !isMouseDown && (curSelectedText = value);
            !isMouseDown && logger.info("TEXT SETTER", value);
            return true;
          },
          get: function () {
            return duplication[key];
          },
        });
      });
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (window.Core) {
      hook();
    } else {
      let Core: unknown = undefined;
      Object.defineProperty(window, "Core", {
        configurable: true,
        set: (value: unknown) => {
          Core = value;
          value && hook();
        },
        get: () => Core,
      });
    }
  } catch (error) {
    logger.warning("INIT TEXT ERROR", error);
  }
};

const onMouseUp = (event: MouseEvent) => {
  logger.info("SELECT", curSelectedText);
  if (curSelectedText && preSelectedText !== curSelectedText) {
    dom.onCopy(curSelectedText, event);
  }
  preSelectedText = curSelectedText;
};

export const Doc88: WebSite = {
  regexp: /www\.doc88\.com/,
  start(type) {
    if (type === COPY_TYPE) {
      init();
      style.insertCSS(
        STYLE_ID,
        AUTO_USER_SELECT + ALLOW_PAINT + COPY_BUTTON_STYLE + "#left-menu{display:none !important;} "
      );
      EventBus.on(EVENTS_TYPE.MOUSE_UP_BUBBLE, onMouseUp);
      EventBus.on(EVENTS_TYPE.MOUSE_UP_CAPTURE, onMouseUpCapture);
      EventBus.on(EVENTS_TYPE.MOUSE_DOWN_CAPTURE, onMouseDownCapture);
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
      EventBus.off(EVENTS_TYPE.MOUSE_UP_CAPTURE, onMouseUpCapture);
      EventBus.off(EVENTS_TYPE.MOUSE_DOWN_CAPTURE, onMouseDownCapture);
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
