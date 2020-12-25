import style from "./style.css";
import google from "./modules/google.js";
import zhihu from "./modules/zhihu.js";
import csdn from "./modules/csdn.js";

const modules = [google, zhihu, csdn];

(function() {
    var $ = window.$;
    const mather = (regex, site, ...args) => {
        if(regex.test(window.location.href)) {
            site.init(...args);
        };
    } 
    modules.forEach(v => mather(v.regexp, v, $));
})();
