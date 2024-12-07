import { FALLBACK_CLASS } from "./constant";

export const inspectWaterMarkDOM = (node: Node) => {
  if (node instanceof HTMLElement === false) {
    return false;
  }
  if (node.classList.contains(FALLBACK_CLASS)) {
    return true;
  }
  if (!node.hasAttribute("style") || node.style.pointerEvents !== "none") {
    return false;
  }
  if (node.style.background.startsWith("url") || node.style.backgroundImage.startsWith("url")) {
    !node.classList.contains(FALLBACK_CLASS) && node.classList.add(FALLBACK_CLASS);
    return true;
  }
  return false;
};
