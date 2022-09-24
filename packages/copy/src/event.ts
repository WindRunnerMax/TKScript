import { COPY, DOM_READY, MOUSE_DOWN } from "./constant/constant";
import instance from "./utils/instance";
import { WebsiteConfig } from "./websites";

export const initBaseEvent = (websiteConfig: WebsiteConfig): void => {
    document.addEventListener(DOM_READY, () => {
        document.addEventListener(MOUSE_DOWN, () => instance.hide());
        if (websiteConfig.initCopyEvent) {
            document.oncopy = e => e.stopPropagation();
            document.body.oncopy = e => e.stopPropagation();
            document.addEventListener(COPY, e => e.stopPropagation());
            document.body.addEventListener(COPY, e => e.stopPropagation());
        }
    });
};
