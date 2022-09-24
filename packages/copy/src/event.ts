import { COPY, DOM_READY } from "./constant/constant";
import { WebsiteConfig } from "./websites";

export const initBaseEvent = (websiteConfig: WebsiteConfig): void => {
    document.addEventListener(DOM_READY, () => {
        if (websiteConfig.initCopyEvent) {
            document.oncopy = e => e.stopPropagation();
            document.body.oncopy = e => e.stopPropagation();
            document.addEventListener(COPY, e => e.stopPropagation());
            document.body.addEventListener(COPY, e => e.stopPropagation());
        }
    });
};
