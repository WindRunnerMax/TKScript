import doc88 from "./modules/doc88";
import sf from "./modules/sf";
import wk from "./modules/wk";
import zhihu from "./modules/zhihu";
import zhihuReader from "./modules/zhihu-reader";
import edu30 from "./modules/edu30";
import docqq from "./modules/docqq";
import boke112 from "./modules/boke112";
import diyifanwen from "./modules/diyifanwen";
import mbalib from "./modules/mbalib";
import cnitpm from "./modules/cnitpm";
import mihoyo from "./modules/mihoyo";
import uemeds from "./modules/uemeds";
import aiyuke from "./modules/aiyuke";
import qidian from "./modules/qidian";
import zongheng from "./modules/zongheng";
import k17 from "./modules/17k";
import ciweimao from "./modules/ciweimao";
import qqbook from "./modules/qqbook";
import utaten from "./modules/utaten";
import baiduwk from "./modules/baiduwk";
import xiaohongshu from "./modules/xiaohongshu";
import leetcode from "./modules/leetcode";
import csdn from "./modules/csdn";
import bilibili from "./modules/bilibili";
import cnki from "./modules/cnki";
import common from "./modules/common";
import commonEnhance from "./modules/common-e";

export interface WebsiteConfig {
    initCopyEvent?: boolean;
    runAt?: "document-start" | "document-end";
}
export interface Website {
    config?: WebsiteConfig;
    regexp: RegExp;
    init: () => void;
    getSelectedText?: () => string;
}

const websites: Website[] = [
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
    qidian,
    zongheng,
    k17,
    ciweimao,
    qqbook,
    utaten,
    baiduwk,
    xiaohongshu,
    doc88,
    leetcode,
    csdn,
    bilibili,
    cnki,
    common,
    commonEnhance,
];

export default websites;
