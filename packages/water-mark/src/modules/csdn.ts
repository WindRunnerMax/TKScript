import type { Website } from "../types/website";
import { FALLBACK_CLASS, OPACITY_PROPERTY } from "../utils/constant";
import { injectCSSEarly } from "../utils/styles";

export const csdn: Website = {
  regexp: /so\.csdn\.net/,
  init: () => {
    const observer = MutationObserver.prototype.observe;
    MutationObserver.prototype.observe = function (target, options) {
      if (target instanceof Element && target.classList.contains("chat-mask")) {
        const nodes = Array.from(target.children);
        nodes.forEach(node => {
          const styles = node.getAttribute("style") || "";
          if (
            styles.indexOf("data:image/") > -1 &&
            styles.indexOf("background-image") > -1 &&
            !node.classList.contains(FALLBACK_CLASS)
          ) {
            node.classList.add(FALLBACK_CLASS);
          }
        });
        return;
      }
      observer.call(this, target, options);
    };
    const classes = ["." + FALLBACK_CLASS].join(",");
    injectCSSEarly(`${classes}{${OPACITY_PROPERTY}}`);
  },
};
