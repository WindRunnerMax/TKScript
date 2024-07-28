import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import type { WebSite } from "../types/website";
import { EVENTS_ENUM, EventBus } from "../utils/bus";
import { styles } from "copy-currency/src/utils";
import { stopNativePropagation } from "../utils/events";
import instance from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, STYLE_ID } from "../utils/styles";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const win: any = window;

export const QQPpt: WebSite = {
  regexp: /docs?\.(weixin\.)?qq\.com\/slide\/.+/,
  init() {
    let webpackJsonp = win.webpackJsonp;
    Object.defineProperty(win, "webpackJsonp", {
      get() {
        return webpackJsonp;
      },
      set(newValue) {
        if (newValue.push.__HOOKED__) {
          return;
        }
        webpackJsonp = newValue;
        const originPush = webpackJsonp.push;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function push(...args: any[]) {
          const [, mods] = args[0];
          for (const [key, fn] of Object.entries(mods)) {
            const stringifyFn = String(fn);
            if (/this\.shouldResponseCopy\(/.test(stringifyFn)) {
              const payload =
                "((...args) => window.__CAN_COPY === undefined " +
                "? this.shouldResponseCopy(...args) " +
                ": window.__CAN_COPY)(";
              const next = stringifyFn.replace(/this\.shouldResponseCopy\(/g, payload);
              mods[key] = new Function(`return (${next})`)();
            }
          }
          // @ts-expect-error this
          return originPush.call(this, ...args);
        }
        push.__HOOKED__ = 1;
        webpackJsonp.push = push;
      },
    });
  },
  start(type) {
    if (type === COPY_TYPE) {
      win.__CAN_COPY = true;
      styles.insertCSS(STYLE_ID, AUTO_USER_SELECT + ALLOW_PAINT);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.on(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.on(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
  close(type) {
    if (type === COPY_TYPE) {
      win.__CAN_COPY = undefined;
      instance.destroy();
      styles.removeCSS(STYLE_ID);
      EventBus.off(EVENTS_ENUM.SELECT_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.off(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
};
