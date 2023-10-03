import { DOM_READY, PAGE_LOADED } from "copy/src/constant/event";
import { EVENTS_TYPE, EventBus } from "./bus";

export const delayExecute = (
  fn: () => void,
  when: typeof DOM_READY | typeof PAGE_LOADED = PAGE_LOADED
) => {
  if (when === DOM_READY) {
    if (document.readyState !== "loading") {
      fn();
    } else {
      EventBus.once(EVENTS_TYPE.DOM_LOADED, fn);
    }
  } else {
    if (document.readyState === "complete") {
      fn();
    } else {
      EventBus.once(EVENTS_TYPE.PAGE_LOADED, fn);
    }
  }
};
