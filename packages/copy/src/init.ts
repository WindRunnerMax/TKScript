import appStyle from "./styles/app.css";
import baseStyle from "./styles/style.css";
import { COPY, DOM_READY } from "./constant/event";
import type { WebsiteConfig } from "./websites";
import dom from "./utils/dom";

export const initBaseEvent = (websiteConfig: WebsiteConfig): void => {
  window.addEventListener(DOM_READY, () => {
    if (websiteConfig.initCopyEvent) {
      document.oncopy = e => e.stopPropagation();
      document.body.oncopy = e => e.stopPropagation();
      document.addEventListener(COPY, e => e.stopPropagation());
      document.body.addEventListener(COPY, e => e.stopPropagation());
    }
  });
};

export const initBaseStyle = (): void => {
  window.addEventListener(DOM_READY, () => {
    dom.append("head", `<style>${appStyle}</style>`);
    dom.append("head", `<style>${baseStyle}</style>`);
  });
};
