import doc88 from "./modules/doc88.js";
import sf from "./modules/sf.js";
import wk from "./modules/wk.js";
import zhihu from "./modules/zhihu.js";
import zhihuReader from "./modules/zhihu-reader.js";
import edu30 from "./modules/edu30.js";
import docqq from "./modules/docqq.js";
import boke112 from "./modules/boke112.js";
import diyifanwen from "./modules/diyifanwen.js";
import mbalib from "./modules/mbalib.js";
import cnitpm from "./modules/cnitpm.js";
import mihoyo from "./modules/mihoyo.js";
import uemeds from "./modules/uemeds.js";
import aiyuke from "./modules/aiyuke.js";
import common from "./modules/common.js";

let siteGetSelectedText = null;
const modules = [
    doc88, 
    sf, 
    wk, 
    zhihu, 
    zhihuReader, 
    edu30, 
    docqq, 
    boke112, 
    diyifanwen,
    mbalib,
    cnitpm,
    mihoyo,
    uemeds,
    aiyuke,
    common,
];

function initWebsite($){
    const mather = (regex, site, ...args) => {
        if(regex.test(window.location.href)) {
            site.init(...args);
            if(site.getSelectedText) siteGetSelectedText = site.getSelectedText;
        }
    }; 
    modules.forEach(v => mather(v.regexp, v, $));
}

function getSelectedText() {
    if(siteGetSelectedText) return siteGetSelectedText();
    if(window.getSelection) return window.getSelection().toString();
    else if(document.getSelection) return document.getSelection();
    else if(document.selection) return document.selection.createRange().text;
    return "";
}


export { initWebsite, getSelectedText };