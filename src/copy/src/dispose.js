import websites from "./websites";

let siteGetSelectedText = null;

function initWebsite($){
    const mather = (regex, site, ...args) => {
        if(regex.test(window.location.href)) {
            site.init(...args);
            if(site.getSelectedText) siteGetSelectedText = site.getSelectedText;
        }
    }; 
    websites.forEach(v => mather(v.regexp, v, $));
}

function getSelectedText() {
    if(siteGetSelectedText) return siteGetSelectedText();
    if(window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText };