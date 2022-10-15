// ==UserScript==
// @name        🔥🔥🔥跳转链接直达🔥🔥🔥
// @description 跳转链接直达，去掉确定跳转链接页面，用于谷歌、知乎、CSDN、简书
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.3.0
// @author      Czy
// @include     *://*.google.com/*
// @include     *://link.zhihu.com/*
// @include     *://link.csdn.net/*
// @include     *://link.juejin.cn*
// @include     *://www.jianshu.com/go-wild*
// @include     *://mail.qq.com/cgi-bin/readtemplate*
// @license     MIT License
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @installURL  https://github.com/WindrunnerMax/TKScript
// @run-at      document-start
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
    'use strict';

    const website$5 = {
      regexp: /google/,
      init: function() {
        document.addEventListener(
          "DOMContentLoaded",
          () => document.querySelectorAll("#res a").forEach((item) => item.setAttribute("target", "_blank"))
        );
      }
    };

    const website$4 = {
      regexp: /zhihu/,
      init: function() {
        const result = /.*link.zhihu.com\/\?target=(.*)/.exec(location.href);
        if (result) {
          const url = decodeURIComponent(result[1]);
          if (url) {
            console.log(url);
            location.href = url;
          }
        }
      }
    };

    const website$3 = {
      regexp: /csdn/,
      init: function() {
        const result = /.*link.csdn.net\/\?target=(.*)/.exec(location.href);
        if (result) {
          const url = decodeURIComponent(result[1]);
          if (url) {
            console.log(url);
            location.href = url;
          }
        }
      }
    };

    const website$2 = {
      regexp: /jianshu/,
      init: function() {
        const result = /.*jianshu.com\/go-wild.*url=(.*)/.exec(location.href);
        if (result) {
          const url = decodeURIComponent(result[1]);
          if (url) {
            location.href = url;
          }
        }
      }
    };

    const website$1 = {
      regexp: /mail\.qq/,
      init: function() {
        const result = new URL(location.href).searchParams.get("gourl");
        if (result) {
          location.href = decodeURIComponent(result);
        }
      }
    };

    const website = {
      regexp: /link\.juejin/,
      init: function() {
        const result = new URL(location.href).searchParams.get("target");
        if (result) {
          location.href = decodeURIComponent(result);
        }
      }
    };

    const websites = [website$5, website$4, website$3, website$2, website$1, website];

    (() => {
      const mather = (regex, website) => {
        if (regex.test(window.location.href)) {
          website.init();
          return true;
        }
        return false;
      };
      websites.some((website) => mather(website.regexp, website));
    })();

})();
