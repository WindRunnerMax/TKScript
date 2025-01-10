import { styles } from "../../../copy-currency/src/utils";

export const injectCSSEarly = (css: string) => {
  if (typeof GM_addStyle === "function") {
    GM_addStyle(css);
    return void 0;
  }
  const style = document.createElement("style");
  style.innerText = css;
  const head = document.head;
  if (head) {
    head.appendChild(style);
    return void 0;
  }
  const html = document.documentElement;
  if (html) {
    html.appendChild(style);
    return void 0;
  }
  styles.insertCSS(String(Math.random()), css);
};
