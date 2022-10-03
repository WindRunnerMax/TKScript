import { DOM_READY, DOM_STAGE } from "./constant/constant";
import { CopyParams } from "./utils/copy";
import websites, { Website, WebsiteConfig } from "./websites";

let siteGetSelectedText: () => CopyParams | null = null;

const initWebsite = (): WebsiteConfig => {
    let websiteConfig: WebsiteConfig = {
        initCopyEvent: true,
        runAt: DOM_STAGE.END,
        captureInstance: false,
        delay: 0,
    };
    const mather = (regex: RegExp, website: Website) => {
        if (regex.test(window.location.href)) {
            if (website.config) websiteConfig = Object.assign(websiteConfig, website.config);
            if (websiteConfig.runAt === DOM_STAGE.END) {
                document.addEventListener(DOM_READY, () => website.init());
            } else {
                website.init();
            }
            if (website.getSelectedText) siteGetSelectedText = website.getSelectedText;
            return true;
        }
        return false;
    };
    websites.some(website => mather(website.regexp, website));
    return websiteConfig;
};

const getSelectedText = (): CopyParams => {
    if (siteGetSelectedText) return siteGetSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    if (document.getSelection) return document.getSelection().toString();
    if (document.selection) return document.selection.createRange().text;
    return "";
};

export { initWebsite, getSelectedText };
