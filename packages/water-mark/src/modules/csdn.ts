import type { Website } from "../types/website";
import { FALLBACK_CLASS, OPACITY_PROPERTY } from "../utils/constant";
import { lintWaterMarkDOM } from "../utils/dom";
import { injectCSSEarly } from "../utils/styles";

export const csdn: Website = {
  regexp: /so\.csdn\.net/,
  init: () => {
    const observer = MutationObserver.prototype.observe;
    MutationObserver.prototype.observe = function (target, options) {
      if (target instanceof Element && target.classList.contains("chat-mask")) {
        const nodes = Array.from(target.children);
        nodes.forEach(node => lintWaterMarkDOM(node));
        return;
      }
      observer.call(this, target, options);
    };
    const classes = ["." + FALLBACK_CLASS].join(",");
    injectCSSEarly(`${classes}{${OPACITY_PROPERTY}}`);
  },
};
