import doc88 from "./website/doc88.js"

function initWebsite($, ClipboardJS){
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) doc88.init();
}

function getSelectedText() {
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) return doc88.getSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText }