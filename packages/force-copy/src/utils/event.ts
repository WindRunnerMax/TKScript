import { insertCSS, removeCSS } from "./style";

export const STORAGE_KEY_PREFIX = "___copy-currency--";

const stopNativePropagation = (event: Event) => event.stopPropagation();

export const enableCopyHook = () => {
  window.addEventListener("selectstart", stopNativePropagation, true);
  window.addEventListener("copy", stopNativePropagation, true);
  insertCSS(
    STORAGE_KEY_PREFIX + "selectstart-and-copy",
    "*{user-select: auto !important;-webkit-user-select: auto !important;}"
  );
};
export const disableCopyHook = () => {
  window.removeEventListener("selectstart", stopNativePropagation, true);
  window.removeEventListener("copy", stopNativePropagation, true);
  removeCSS(STORAGE_KEY_PREFIX + "selectstart-and-copy");
};

export const enableContextMenuHook = () => {
  window.addEventListener("contextmenu", stopNativePropagation, true);
};
export const disableContextMenuHook = () => {
  window.removeEventListener("contextmenu", stopNativePropagation, true);
};

export const enableKeydownHook = () => {
  window.addEventListener("keydown", stopNativePropagation, true);
};
export const disableKeydownHook = () => {
  window.removeEventListener("keydown", stopNativePropagation, true);
};
