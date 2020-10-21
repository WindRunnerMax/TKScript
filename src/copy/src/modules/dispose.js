import doc88 from "./website/doc88.js"
import sf from "./website/sf.js"
import wk from "./website/wk.js"
import leetcode from "./website/leetcode.js"

function initWebsite($, ClipboardJS){
    if (window.location.href.match(/.*doc88\.com\/.+/)) doc88.init();
    if (window.location.href.match(/.*segmentfault\.com\/.+/)) sf.init($);
    if (window.location.href.match(/.*wk\.baidu\.com\/view\/.+/)) wk.init($);
    if (window.location.href.match(/.*leetcode-cn\.com\/problems\/.+/)) leetcode.init($);
}

function getSelectedText() {
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) return doc88.getSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText }