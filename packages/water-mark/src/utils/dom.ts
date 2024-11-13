import { FALLBACK_CLASS } from "./constant";

export const lintWaterMarkDOM = (node: Node) => {
  if (node instanceof HTMLElement && node.hasAttribute("style")) {
    if (node.style.pointerEvents !== "none") {
      return false;
    }
    if (node.style.background.startsWith("url") || node.style.backgroundImage.startsWith("url")) {
      !node.classList.contains(FALLBACK_CLASS) && node.classList.add(FALLBACK_CLASS);
      return true;
    }
  }
  return false;
};
