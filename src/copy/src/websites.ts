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
import common from "./modules/common";

export interface WebsiteConfig {
    initCopyEvent?: boolean;
}
export interface Website {
    config?: WebsiteConfig;
    regexp: RegExp;
    init: ($: JQueryStatic) => void;
    getSelectedText?: () => string;
}

const websites: Website[] = [
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
    qidian,
    zongheng,
    k17,
    ciweimao,
    qqbook,
    utaten,
    baiduwk,
    xiaohongshu,
    leetcode,
    csdn,
    common,
];

export default websites;
