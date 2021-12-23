import websites, { Website, WebsiteConfig } from "./websites";

let siteGetSelectedText: () => string | null = null;

const initWebsite = ($: JQueryStatic): WebsiteConfig => {
    let websiteConfig: WebsiteConfig = {
        initCopyEvent: true,
    };
    const mather = (regex: RegExp, website: Website) => {
        if (regex.test(window.location.href)) {
            website.init($);
            if (website.config) websiteConfig = Object.assign(websiteConfig, website.config);
            if (website.getSelectedText) siteGetSelectedText = website.getSelectedText;
            return true;
        }
        return false;
    };
    websites.some(website => mather(website.regexp, website));
    return websiteConfig;
};

const getSelectedText = (): string => {
    if (siteGetSelectedText) return siteGetSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    if (document.getSelection) return document.getSelection().toString();
    if (document.selection) return document.selection.createRange().text;
    return "";
};

export { initWebsite, getSelectedText };
