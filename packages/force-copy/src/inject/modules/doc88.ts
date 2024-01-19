import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import type { WebSite } from "../types/website";
import { EVENTS_ENUM, EventBus } from "../utils/bus";
import styles from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import instance from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, COPY_BUTTON_STYLE, STYLE_ID } from "../utils/styles";
import { logger } from "@/utils/logger";
import { isString } from "laser-utils";
import { delayExecute } from "../utils/delay";
import { PAGE_LOADED } from "copy/src/constant/event";

let isMouseDown = false;
let preSelectedText = "";
let curSelectedText = "";

const onMouseDownCapture = () => {
  isMouseDown = true;
  instance.hide(false);
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
    } else if (window.Core === null) {
      delayExecute(PAGE_LOADED).then(hook);
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
    instance.onCopy(curSelectedText, event);
    instance.show(event);
  }
  preSelectedText = curSelectedText;
};

export const Doc88: WebSite = {
  regexp: /www\.doc88\.com/,
  start(type) {
    if (type === COPY_TYPE) {
      init();
      styles.insertCSS(
        STYLE_ID,
        AUTO_USER_SELECT + ALLOW_PAINT + COPY_BUTTON_STYLE + "#left-menu{display:none !important;} "
      );
      EventBus.on(EVENTS_ENUM.MOUSE_UP_BUBBLE, onMouseUp);
      EventBus.on(EVENTS_ENUM.MOUSE_UP_CAPTURE, onMouseUpCapture);
      EventBus.on(EVENTS_ENUM.MOUSE_DOWN_CAPTURE, onMouseDownCapture);
      EventBus.on(EVENTS_ENUM.COPY_CAPTURE, stopNativePropagation);
      EventBus.on(EVENTS_ENUM.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.on(EVENTS_ENUM.SELECT_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.on(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.on(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
  close(type) {
    if (type === COPY_TYPE) {
      instance.destroy();
      styles.removeCSS(STYLE_ID);
      EventBus.off(EVENTS_ENUM.MOUSE_UP_BUBBLE, onMouseUp);
      EventBus.off(EVENTS_ENUM.MOUSE_UP_CAPTURE, onMouseUpCapture);
      EventBus.off(EVENTS_ENUM.MOUSE_DOWN_CAPTURE, onMouseDownCapture);
      EventBus.off(EVENTS_ENUM.COPY_CAPTURE, stopNativePropagation);
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, copyKeyboardHandler);
      EventBus.off(EVENTS_ENUM.SELECT_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.off(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
};
