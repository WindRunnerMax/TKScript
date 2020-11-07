import doc88 from "./website/doc88.js";
import sf from "./website/sf.js";
import wk from "./website/wk.js";
import leetcode from "./website/leetcode.js";
import zhihu from "./website/zhihu.js";
import edu30 from "./website/edu30.js";

function initWebsite($, ClipboardJS){
    const mather = (regex, funct, ...args) =>{
        if(regex.test(window.location.href)) funct(...args);
    } 
    mather(/.*doc88\.com\/.+/, doc88.init);
    mather(/.*segmentfault\.com\/.+/, wk.init, $);
    mather(/.*wk\.baidu\.com\/view\/.+/, wk.init, $);
    mather(/.*leetcode-cn\.com\/problems\/.+/, leetcode.init, $);
    mather(/.*zhihu\.com\/.+/, zhihu.init, $);
    mather(/.*30edu\.com\.cn\/.+/, edu30.init, $);
}

function getSelectedText() {
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) return doc88.getSelectedText();
    if (window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText }