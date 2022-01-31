import "./style.css";
import google from "./modules/google";
import zhihu from "./modules/zhihu";
import csdn from "./modules/csdn";
import jianshu from "./modules/jianshu";

export interface Website {
    regexp: RegExp;
    init: ($: JQueryStatic) => void;
}

const websites: Website[] = [google, zhihu, csdn, jianshu];

export default websites;
