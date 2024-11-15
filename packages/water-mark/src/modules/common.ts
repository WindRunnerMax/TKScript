import type { Website } from "../types/website";
import { FALLBACK_CLASS, OPACITY_BACKGROUND_PROPERTY, OPACITY_PROPERTY } from "../utils/constant";
import { lintWaterMarkDOM } from "../utils/dom";
import { injectCSSEarly } from "../utils/styles";

export const common: Website = {
  regexp: /.*/,
  init: () => {
    const observer = MutationObserver.prototype.observe;
    MutationObserver.prototype.observe = function (target, options) {
      lintWaterMarkDOM(target);
      target.childNodes.forEach(lintWaterMarkDOM);
      observer.call(this, target, options);
    };
    const _MutationObserver = MutationObserver;
    const cb = (callback: MutationCallback) => {
      return (records: MutationRecord[], observer: MutationObserver) => {
        let isMatchedWaterMarkDOM = false;
        for (const record of records) {
          if (lintWaterMarkDOM(record.target) && !isMatchedWaterMarkDOM) {
            isMatchedWaterMarkDOM = true;
          }
        }
        !isMatchedWaterMarkDOM && callback(records, observer);
      };
    };
    unsafeWindow.MutationObserver = class extends _MutationObserver {
      constructor(callback: MutationCallback) {
        super(cb(callback));
      }
    };
    const PRESET_CLASSES = [
      "." + FALLBACK_CLASS,
      `div[id*="watermark"]`,
      `div[id*="WaterMark"]`,
      `div[id*="Watermark"]`,
      `div[class*="watermark"]`,
      `div[class*="WaterMark"]`,
      `div[class*="Watermark"]`,
    ].join(",");
    injectCSSEarly(`${PRESET_CLASSES}{${OPACITY_PROPERTY}}`);
    const PRESET_BACKGROUND = [
      `div[style*="pointer-events"][style*="background: url"]`,
      `div[style*="pointer-events"][style*="background-image: url"]`,
      `div[style*="pointer-events"][style*="background:url"]`,
      `div[style*="pointer-events"][style*="background-image:url"]`,
    ].join(",");
    injectCSSEarly(`${PRESET_BACKGROUND}{${OPACITY_BACKGROUND_PROPERTY}}`);
  },
};
