import "./style.css";
import google from "./modules/google";
import zhihu from "./modules/zhihu";
import csdn from "./modules/csdn";

export interface Website {
    regexp: RegExp;
    init: ($: JQueryStatic) => void;
}

const websites: Website[] = [google, zhihu, csdn];

export default websites;
