// ==UserScript==
// @name         自动阅读全文
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Czy
// @match        https://blog.csdn.net/*
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==

function show(dom){
    dom[0] ? dom[0].click() : "";
}

(function() {
    'use strict';

    /* CSDN 展开阅读全文 */
    show(document.getElementsByClassName('btn-readmore'));

    /* 知乎 查看全部回答 */
    setTimeout(()=>{show(document.getElementsByClassName('QuestionMainAction ViewAll-QuestionMainAction'))},1000);

})();