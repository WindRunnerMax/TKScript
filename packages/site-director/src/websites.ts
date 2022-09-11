import "./style.css";
import google from "./modules/google";
import zhihu from "./modules/zhihu";
import csdn from "./modules/csdn";
import jianshu from "./modules/jianshu";
import qqMail from "./modules/qq-mail";
import juejin from "./modules/juejin";

export interface Website {
    regexp: RegExp;
    init: ($: JQueryStatic) => void;
}

const websites: Website[] = [google, zhihu, csdn, jianshu, qqMail, juejin];

export default websites;
