// ==UserScript==
// @name        🔥🔥🔥跳转链接直达🔥🔥🔥
// @description 跳转链接直达，去掉确定跳转链接页面，用于谷歌、知乎、CSDN
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.1.0
// @author      Czy
// @include     *://*google.com/*
// @include     *://*zhihu.com/*
// @include     *://*csdn.net/*
// @license     MIT License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/meta/site-director.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/site-director.js
// @require     https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
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
          $("#res a").attr("target", "_blank");
      },
  };

  var utils = {
      directByBlockEvent: function (event) {
          event.stopPropagation();
          event.preventDefault();
      },
      directByCapture: function (el) {
          var _this = this;
          el.addEventListener("click", function (e) { return _this.directByBlockEvent(e); });
      },
  };

  var website$1 = {
      regexp: /zhihu/,
      init: function () {
          document.body.addEventListener("click", function (e) {
              var cur = e.target;
              var regexp = /.*link.zhihu.com\/\?target=(.*)/;
              for (var i = 0; i < 5; ++i) {
                  if (!cur)
                      break;
                  if (cur.nodeName === "A") {
                      if (regexp.test(cur.href)) {
                          var url = decodeURIComponent(/.*link.zhihu.com\/\?target=(.*)/.exec(cur.href)[1]);
                          console.log(url);
                          window.open(url);
                          utils.directByBlockEvent(e);
                      }
                      break;
                  }
                  cur = cur.parentNode;
              }
          }, true);
      },
  };

  var website = {
      regexp: /csdn/,
      init: function ($) {
          $("#article_content  a:not([name])").each(function (i, v) {
              var el = v;
              var a = document.createElement("a");
              a.innerHTML = "<span onclick=\"window.open('".concat(el.href, "')\">").concat(el.innerText, "</>");
              v.replaceWith(a);
          });
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
