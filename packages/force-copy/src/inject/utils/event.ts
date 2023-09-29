import styles from "copy-currency/src/utils";
import { CONTEXT_MENU, COPY, KEY_DOWN, SELECT_START } from "copy/src/constant/event";

export const STYLE_ID = "__FORCE_COPY__";

const stopNativePropagation = (event: Event) => event.stopPropagation();

export const enableCopyHook = () => {
  window.addEventListener(SELECT_START, stopNativePropagation, true);
  window.addEventListener(COPY, stopNativePropagation, true);
  styles.insertCSS(
    STYLE_ID,
    "*{user-select: auto !important;-webkit-user-select: auto !important;}"
  );
};
export const disableCopyHook = () => {
  window.removeEventListener(SELECT_START, stopNativePropagation, true);
  window.removeEventListener(COPY, stopNativePropagation, true);
  styles.removeCSS(STYLE_ID);
};

export const enableContextMenuHook = () => {
  window.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
};
export const disableContextMenuHook = () => {
  window.removeEventListener(CONTEXT_MENU, stopNativePropagation, true);
};

export const enableKeydownHook = () => {
  window.addEventListener(KEY_DOWN, stopNativePropagation, true);
};
export const disableKeydownHook = () => {
  window.removeEventListener(KEY_DOWN, stopNativePropagation, true);
};
