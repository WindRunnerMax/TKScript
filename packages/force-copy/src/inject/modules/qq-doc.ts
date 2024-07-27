import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import type { WebSite } from "../types/website";
import { EVENTS_ENUM, EventBus } from "../utils/bus";
import { styles } from "copy-currency/src/utils";
import { onCopyKeyboardHandler, stopNativePropagation } from "../utils/events";
import instance from "copy/src/utils/instance";
import { ALLOW_PAINT, AUTO_USER_SELECT, COPY_BUTTON_STYLE, STYLE_ID } from "../utils/styles";
import { logger } from "@/utils/logger";
import { TEXT_HTML, TEXT_PLAIN } from "copy/src/utils/copy";

const onMouseDown = () => {
  instance.hide(false);
};

const onMouseUp = (event: MouseEvent) => {
  // QQ Doc
  if (window.pad && window.pad.editor && !window.pad.editor.isCopyable()) {
    const editor = window.pad.editor;
    if (editor.getCopyContent) {
      const content = editor.getCopyContent() || {};
      const plainText: string | undefined = content.plain;
      const htmlText: string = content.html || "";
      logger.info("SELECT", plainText);
      if (plainText) {
        return instance.onCopy({ [TEXT_PLAIN]: plainText, [TEXT_HTML]: htmlText }, event);
      }
    }
  }
  // QQ Sheet
  if (
    window.SpreadsheetApp &&
    window.SpreadsheetApp.permissions &&
    window.SpreadsheetApp.permissions.sheetStatus &&
    window.SpreadsheetApp.permissions.sheetStatus.canCopy === false &&
    window.SpreadsheetApp.permissions.sheetStatus.canEdit &&
    window.SpreadsheetApp.permissions.sheetStatus.canEdit() === false
  ) {
    const SpreadsheetApp = window.SpreadsheetApp;
    const [selection] = SpreadsheetApp.view.getSelectionRanges();
    if (selection) {
      const text: string[] = [];
      const { startColIndex, startRowIndex, endColIndex, endRowIndex } = selection;
      for (let i = startRowIndex; i <= endRowIndex; i++) {
        for (let k = startColIndex; k <= endColIndex; k++) {
          const cell = SpreadsheetApp.workbook.activeSheet.getCellDataAtPosition(i, k);
          if (!cell) continue;
          text.push(" ", cell.formattedValue?.value || cell.value || "");
        }
        i !== endRowIndex && text.push("\n");
      }
      const str = text.join("");
      logger.info("SELECT", str);
      return instance.onCopy(/^\s*$/.test(str) ? "" : str, event);
    }
  }
  // Final
  return instance.hide(false);
};

export const QQDoc: WebSite = {
  regexp: /docs?\.(weixin\.)?qq\.com\/(doc)|(sheet)\/.+/,
  start(type) {
    if (type === COPY_TYPE) {
      styles.insertCSS(STYLE_ID, AUTO_USER_SELECT + ALLOW_PAINT + COPY_BUTTON_STYLE);
      EventBus.on(EVENTS_ENUM.MOUSE_UP_BUBBLE, onMouseUp);
      EventBus.on(EVENTS_ENUM.MOUSE_DOWN_CAPTURE, onMouseDown);
      EventBus.on(EVENTS_ENUM.COPY_CAPTURE, stopNativePropagation);
      EventBus.on(EVENTS_ENUM.KEY_BOARD_CAPTURE, onCopyKeyboardHandler);
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
      EventBus.off(EVENTS_ENUM.MOUSE_DOWN_CAPTURE, onMouseDown);
      EventBus.off(EVENTS_ENUM.COPY_CAPTURE, stopNativePropagation);
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, onCopyKeyboardHandler);
      EventBus.off(EVENTS_ENUM.SELECT_START_CAPTURE, stopNativePropagation);
    } else if (type === KEYBOARD_TYPE) {
      EventBus.off(EVENTS_ENUM.KEY_BOARD_CAPTURE, stopNativePropagation);
    } else if (type === CONTEXT_MENU_TYPE) {
      EventBus.off(EVENTS_ENUM.CONTEXT_MENU_CAPTURE, stopNativePropagation);
    }
  },
};
