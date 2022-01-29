// ==UserScript==
// @name        🔥🔥🔥跳转链接直达🔥🔥🔥
// @description 跳转链接直达，去掉确定跳转链接页面，用于谷歌、知乎、CSDN
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.2.0
// @author      Czy
// @include     *://*google.com/*
// @include     *://link.zhihu.com/*
// @include     *://link.csdn.net/*
// @license     MIT License
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @installURL  https://github.com/WindrunnerMax/TKScript
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/meta/site-director.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/site-director.js
// @require     https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js
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

  var website$2 = {
      regexp: /google/,
      init: function ($) {
          document.addEventListener("DOMContentLoaded", function () { return $("#res a").attr("target", "_blank"); });
      },
  };

  var website$1 = {
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

  var website = {
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

  var websites = [website$2, website$1, website];

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
