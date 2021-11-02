import websites, { Website } from "./websites";

let siteGetSelectedText: () => string | null = null;

const initWebsite = ($: JQueryStatic): void => {
    const mather = (regex: RegExp, website: Website) => {
        if (regex.test(window.location.href)) {
            website.init($);
            if (website.getSelectedText) siteGetSelectedText = website.getSelectedText;
        }
    };
    websites.forEach(website => mather(website.regexp, website));
};

const getSelectedText = (): string => {
    if (siteGetSelectedText) return siteGetSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    else if (document.getSelection) return document.getSelection().toString();
    else if (document.selection) return document.selection.createRange().text;
    return "";
};

export { initWebsite, getSelectedText };
