import type { Website } from "../types/website";
import { FALLBACK_CLASS, OPACITY_PROPERTY } from "../utils/constant";
import { injectCSSEarly } from "../utils/styles";

export const feishu: Website = {
  regexp: /(feishu\.cn)|(larkoffice\.com)/,
  init: () => {
    const _MutationObserver = MutationObserver;
    const cb: MutationCallback = records => {
      records.forEach(r => {
        if (r.target instanceof Element && r.target.hasAttribute("style")) {
          const el = r.target;
          const styles = el.getAttribute("style") || "";
          if (
            styles.indexOf("data:image/") > -1 &&
            styles.indexOf("background-image") > -1 &&
            !el.classList.contains(FALLBACK_CLASS)
          ) {
            el.classList.add(FALLBACK_CLASS);
          }
        }
      });
    };
    unsafeWindow.MutationObserver = class extends _MutationObserver {
      constructor(callback: MutationCallback) {
        const fn = callback.toString();
        const isWatermark = /watermark/.test(fn);
        super(isWatermark ? cb : callback);
      }
    };
    const classes = [
      "." + FALLBACK_CLASS,
      ".token-watermark-bg",
      ".ssrWaterMark",
      ".ssrHiddenWaterMark",
      ".print-watermark",
      ".suite-clear",
    ].join(",");
    injectCSSEarly(`${classes}{${OPACITY_PROPERTY}}`);
  },
};
