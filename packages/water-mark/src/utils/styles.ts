import { styles } from "../../../copy-currency/src/utils";

export const injectCSSEarly = (css: string) => {
  const style = document.createElement("style");
  style.innerText = css;
  const head = document.head;
  if (head) {
    head.appendChild(style);
    return;
  }
  const html = document.documentElement;
  if (html) {
    html.appendChild(style);
    return;
  }
  styles.insertCSS(String(Math.random()), css);
};
