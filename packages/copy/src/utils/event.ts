import { CONTEXT_MENU, COPY, KEY_DOWN, PAGE_LOADED, SELECT_START } from "../constant/event";
import instance from "./instance";
import { isString } from "./is";

export const stopNativePropagation = (event: Event): void => {
  // event.stopImmediatePropagation(); // 即停且阻止该元素在此事件绑定之后的`on`同类事件触发
  event.stopPropagation(); // 阻止该元素继续冒泡后的`on`同类事件触发
};

export const event = {
  hideButton: (): void => {
    instance.disable();
  },
  showButton: (): void => {
    instance.enable();
  },
  removeAttributes: (selector: string | HTMLElement, attr: string[] = []): void => {
    const dom = isString(selector) ? document.querySelector(selector) : selector;
    dom && attr.forEach(item => dom.removeAttribute(item));
  },
  enableUserSelectByCSS: (): void => {
    const css = "*{user-select: auto !important;-webkit-user-select: auto !important;}";
    const style = document.createElement("style");
    style.innerText = css;
    const head = document.getElementsByTagName("head")[0];
    if (head) {
      head.appendChild(style);
    } else {
      window.addEventListener(PAGE_LOADED, () =>
        document.getElementsByTagName("head")[0].appendChild(style)
      );
    }
  },
  enableOnSelectStart: (selector: string): void => {
    const dom = document.querySelector(selector);
    dom && dom.addEventListener(SELECT_START, stopNativePropagation);
  },
  enableOnContextMenu: (selector: string): void => {
    const dom = document.querySelector(selector);
    dom && dom.addEventListener(CONTEXT_MENU, stopNativePropagation);
  },
  enableOnCopy: (selector: string): void => {
    const dom = document.querySelector(selector);
    dom && dom.addEventListener(COPY, stopNativePropagation);
  },
  enableOnKeyDown: (selector: string): void => {
    const dom = document.querySelector(selector) as HTMLDivElement;
    dom &&
      dom.addEventListener(KEY_DOWN, (e: KeyboardEvent) => {
        if (e.key === "c" && e.ctrlKey) return e.stopPropagation();
      });
  },
  enableOnSelectStartByCapture: (): void => {
    window.addEventListener(SELECT_START, stopNativePropagation, true);
    document.addEventListener(SELECT_START, stopNativePropagation, true);
  },
  enableOnContextMenuByCapture: (): void => {
    window.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
    document.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
  },
  enableOnCopyByCapture: (): void => {
    window.addEventListener(COPY, stopNativePropagation, true);
    document.addEventListener(COPY, stopNativePropagation, true);
  },
  enableOnKeyDownByCapture: (): void => {
    document.addEventListener(
      KEY_DOWN,
      e => e.ctrlKey && e.key.toLocaleUpperCase() === "C" && e.stopPropagation(),
      true
    );
  },
};

export default event;
