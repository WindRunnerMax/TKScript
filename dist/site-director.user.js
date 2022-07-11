// ==UserScript==
// @name        🔥🔥🔥跳转链接直达🔥🔥🔥
// @description 跳转链接直达，去掉确定跳转链接页面，用于谷歌、知乎、CSDN、简书
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.2.3
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
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/meta/site-director.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/site-director.user.js
// @require     https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js
// @run-at      document-start
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
  'use strict';

  function styleInject(css, ref) {
    if ( ref === void 0 ) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') { return; }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = "";
  styleInject(css_248z);

  var website$5 = {
      regexp: /google/,
      init: function ($) {
          document.addEventListener("DOMContentLoaded", function () { return $("#res a").attr("target", "_blank"); });
      },
  };

  var website$4 = {
      regexp: /zhihu/,
      init: function () {
          var result = /.*link.zhihu.com\/\?target=(.*)/.exec(location.href);
          if (result) {
              var url = decodeURIComponent(result[1]);
              if (url) {
                  console.log(url);
                  location.href = url;
              }
          }
      },
  };

  var website$3 = {
      regexp: /csdn/,
      init: function () {
          var result = /.*link.csdn.net\/\?target=(.*)/.exec(location.href);
          if (result) {
              var url = decodeURIComponent(result[1]);
              if (url) {
                  console.log(url);
                  location.href = url;
              }
          }
      },
  };

  var website$2 = {
      regexp: /jianshu/,
      init: function () {
          var result = /.*jianshu.com\/go-wild.*url=(.*)/.exec(location.href);
          if (result) {
              var url = decodeURIComponent(result[1]);
              if (url) {
                  console.log(url);
                  location.href = url;
              }
          }
      },
  };

  var website$1 = {
      regexp: /mail\.qq/,
      init: function () {
          var result = new URL(location.href).searchParams.get("gourl");
          if (result) {
              location.href = decodeURIComponent(result);
          }
      },
  };

  var website = {
      regexp: /link\.juejin/,
      init: function () {
          var result = new URL(location.href).searchParams.get("target");
          if (result) {
              location.href = decodeURIComponent(result);
          }
      },
  };

  var websites = [website$5, website$4, website$3, website$2, website$1, website];

  (function ($) {
      var mather = function (regex, website) {
          if (regex.test(window.location.href)) {
              website.init($);
              return true;
          }
          return false;
      };
      websites.some(function (website) { return mather(website.regexp, website); });
  })($);

})();
