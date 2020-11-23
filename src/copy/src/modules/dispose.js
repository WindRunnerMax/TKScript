import doc88 from "./website/doc88.js";
import sf from "./website/sf.js";
import wk from "./website/wk.js";
import leetcode from "./website/leetcode.js";
import zhihu from "./website/zhihu.js";
import edu30 from "./website/edu30.js";
import docqq from "./website/docqq.js";

let siteGetSelectedText = null;

function initWebsite($, ClipboardJS){
    const mather = (regex, site, ...args) =>{
        if(regex.test(window.location.href)) {
            site.init(...args);
            if(site.getSelectedText)  siteGetSelectedText = site.getSelectedText;
        };
    } 
    mather(/.*doc88\.com\/.+/, doc88);
    mather(/.*segmentfault\.com\/.+/, wk, $);
    mather(/.*wk\.baidu\.com\/view\/.+/, wk, $);
    mather(/.*leetcode-cn\.com\/problems\/.+/, leetcode, $);
    mather(/.*zhihu\.com\/.+/, zhihu, $);
    mather(/.*30edu\.com\.cn\/.+/, edu30, $);
    mather(/.*docs\.qq\.com\/.+/, docqq, $);
}

function getSelectedText() {
    if (siteGetSelectedText) return siteGetSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText }