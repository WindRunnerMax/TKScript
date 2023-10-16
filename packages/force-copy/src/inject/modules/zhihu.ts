import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { WebSite } from "../types/website";
import { EVENTS_ENUM, EventBus } from "../utils/bus";
import styles from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import { ALLOW_PAINT, AUTO_USER_SELECT, STYLE_ID } from "../utils/styles";
import { delayExecute } from "../utils/delay";
import { DOM_LOADED } from "copy/src/constant/event";

const init = () => {
  if (location.hostname === "zhuanlan.zhihu.com") {
    const elements = document.querySelectorAll("[data-focus-scope-start]");
    elements.forEach(node => {
      if ((node.textContent || "").indexOf("立即登录/注册") > -1) {
        node.parentElement ? node.parentElement.remove() : node.remove();
      }
    });
    const removeFocalPointModal: MutationCallback = mutationsList => {
      for (const mutation of mutationsList) {
        const addedNodes = mutation.addedNodes;
        for (let i = 0; i < addedNodes.length; i++) {
          const target = addedNodes[i];
          if (target.nodeType != 1) return void 0;
          if (
            target instanceof HTMLDivElement &&
            target.querySelector("[data-focus-scope-start]")
          ) {
            const element = target.querySelector("[data-focus-scope-start]");
            element &&
              element.parentElement &&
              (element.parentElement.textContent || "").indexOf("立即登录/注册") > -1 &&
              element.parentElement.parentElement &&
              element.parentElement.parentElement.removeChild(element.parentElement);
          }
        }
      }
    };
    const observer = new MutationObserver(removeFocalPointModal);
    observer.observe(document, { childList: true, subtree: true });
  }
};

export const Zhihu: WebSite = {
  regexp: /zhuanlan\.zhihu\.com/,
  start(type) {
    if (type === COPY_TYPE) {
      delayExecute(DOM_LOADED).then(init);
      styles.insertCSS(STYLE_ID, AUTO_USER_SELECT + ALLOW_PAINT);
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
      styles.removeCSS(STYLE_ID);
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
