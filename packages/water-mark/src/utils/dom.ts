import { FALLBACK_CLASS } from "./constant";

export const lintWaterMarkDOM = (node: Node) => {
  if (node instanceof Element && node.hasAttribute("style")) {
    const styles = node.getAttribute("style") || "";
    if (styles.indexOf("pointer-events: none;") === -1) {
      return false;
    }
    if (styles.indexOf("background: url") > -1 || styles.indexOf("background-image: url") > -1) {
      !node.classList.contains(FALLBACK_CLASS) && node.classList.add(FALLBACK_CLASS);
      return true;
    }
  }
  return false;
};
