import { DOM_READY, PAGE_LOADED } from "copy/src/constant/event";
import { EVENTS_ENUM, EventBus } from "./bus";

export const delayExecute = (
  when: typeof DOM_READY | typeof PAGE_LOADED = PAGE_LOADED,
  delayMax: number | false = 6000
) => {
  const delayWithEvent = new Promise<void>(r => {
    const resolve = () => r();
    if (when === DOM_READY) {
      if (document.readyState !== "loading") {
        resolve();
      } else {
        EventBus.once(EVENTS_ENUM.DOM_LOADED, resolve);
      }
      return void 0;
    }
    if (document.readyState === "complete") {
      resolve();
    } else {
      EventBus.once(EVENTS_ENUM.PAGE_LOADED, resolve);
    }
  });
  const delayWithTimeout = delayMax && new Promise(resolve => setTimeout(resolve, delayMax));
  return Promise.race<unknown>([delayWithEvent, delayWithTimeout].filter(Boolean));
};
