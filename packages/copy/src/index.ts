import { initBaseEvent, initBaseStyle } from "./init";
import { initWebsite, getSelectedText } from "./dispose";
import instance from "./utils/instance";
import { isEmptyContent } from "./utils/copy";

(function () {
    const websiteConfig = initWebsite();
    initBaseEvent(websiteConfig);
    initBaseStyle();
    document.addEventListener("mouseup", e => {
        const content = getSelectedText();
        if (isEmptyContent(content)) {
            instance.hide();
            return "";
        }
        instance.onCopy(content, e);
    });
})();
