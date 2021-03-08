import doc88 from "./website/doc88.js";
import sf from "./website/sf.js";
import wk from "./website/wk.js";
import leetcode from "./website/leetcode.js";
import zhihu from "./website/zhihu.js";
import zhihuReader from "./website/zhihu-reader.js";
import edu30 from "./website/edu30.js";
import docqq from "./website/docqq.js";
import boke112 from "./website/boke112.js";
import yuque from "./website/yuque.js";
import common from "./website/common.js";

let siteGetSelectedText = null;
const modules = [doc88, sf, wk, leetcode, zhihu, zhihuReader, edu30, docqq, boke112, yuque, common];

function initWebsite($, ClipboardJS){
    const mather = (regex, site, ...args) => {
        if(regex.test(window.location.href)) {
            site.init(...args);
            if(site.getSelectedText)  siteGetSelectedText = site.getSelectedText;
        };
    } 
    modules.forEach(v => mather(v.regexp, v, $));
}

function getSelectedText() {
    if(siteGetSelectedText) return siteGetSelectedText();
    if(window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText }