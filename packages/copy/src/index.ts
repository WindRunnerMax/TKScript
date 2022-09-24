import "./styles/app.css";
import "./styles/style.css";
import { initBaseEvent } from "./event";
import { initWebsite, getSelectedText } from "./dispose";
import instance from "./utils/instance";
import { isEmptyContent } from "./utils/copy";

(function () {
    const websiteConfig = initWebsite();
    initBaseEvent(websiteConfig);
    document.addEventListener("mouseup", e => {
        const content = getSelectedText();
        if (isEmptyContent(content)) return "";
        instance.onCopy(content, e);
    });
})();
