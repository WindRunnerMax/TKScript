import type { CopyParams } from "./utils/copy";
import doc88 from "./modules/doc88";
import sf from "./modules/sf";
import wk from "./modules/wk";
import zhihu from "./modules/zhihu";
import edu30 from "./modules/edu30";
import docqq from "./modules/docqq";
import qqSlider from "./modules/qq-slider";
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
import docin from "./modules/docin";
import youdao from "./modules/youdao";
import common from "./modules/common";
import commonEnhance from "./modules/common-e";
import commonPreLoad from "./modules/common-p";
import { kdoc } from "./modules/kdocs";

export interface WebsiteConfig {
  initCopyEvent?: boolean;
  runAt?: "document-start" | "document-end";
  captureInstance?: boolean;
  delay?: number;
}
export interface Website {
  config?: WebsiteConfig;
  regexp: RegExp;
  init: () => void;
  getSelectedText?: () => CopyParams;
}

const websites: Website[] = [
  sf,
  wk,
  zhihu,
  edu30,
  qqSlider,
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
  docin,
  youdao,
  kdoc,
  common,
  commonEnhance,
  commonPreLoad,
];

export default websites;
