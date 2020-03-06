// ==UserScript==
// @name         自动阅读全文
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  try to take over the world!
// @author       Czy
// @match        https://blog.csdn.net/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /* CSDN */
    document.getElementsByClassName('btn-readmore')[0] ? document.getElementsByClassName('btn-readmore')[0].click() : "";


})();