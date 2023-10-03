import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { WebSite } from "../types/website";
import { EVENTS_TYPE, EventBus } from "../utils/bus";
import style from "copy-currency/src/utils";
import { copyKeyboardHandler, stopNativePropagation } from "../utils/events";
import dom from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, COPY_BUTTON_STYLE, STYLE_ID } from "../utils/styles";
import { logger } from "@/utils/logger";
import { TEXT_HTML, TEXT_PLAIN } from "copy/src/utils/copy";

const onMouseUp = (event: MouseEvent) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.pad && window.pad.editor) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const editor = window.pad.editor;
    if (editor.getCopyContent) {
      const content = editor.getCopyContent() || {};
      const plainText: string | undefined = content.plain;
      const htmlText: string | undefined = content.html;
      logger.info("SELECT", plainText);
      if (plainText) {
        dom.onCopy({ [TEXT_PLAIN]: plainText, [TEXT_HTML]: htmlText }, event);
      } else {
        dom.hide();
      }
    }
  } else {
    dom.hide();
  }
};

export const QQDoc: WebSite = {
  regexp: /docs\.qq\.com/,
  start(type) {
    if (type === COPY_TYPE) {
      style.insertCSS(STYLE_ID, AUTO_USER_SELECT + ALLOW_PAINT + COPY_BUTTON_STYLE);
      EventBus.on(EVENTS_TYPE.MOUSE_UP_BUBBLE, onMouseUp);
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
