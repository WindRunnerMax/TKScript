// ==UserScript==
// @name        🔥🔥🔥跳转链接直达🔥🔥🔥
// @description 跳转链接直达，去掉确定跳转链接页面，用于谷歌、知乎、CSDN
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.0.4
// @author      Czy
// @include     *://*google.com/*
// @include     *://*zhihu.com/*
// @include     *://*csdn.net/*
// @license     MIT License
// @require     https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
  'use strict';

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

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
    init: function init($) {
      $("#res a").attr("target", "_blank");
    }
  };

  var website$1 = {
    regexp: /zhihu/,
    init: function init($) {
      $(document).on("click", function (e) {
        var cur = e.target;
        var regexp = /.*link.zhihu.com\/\?target=(.*)/;

        for (var i = 0; i < 5; ++i) {
          if (!cur) break;

          if (cur.nodeName === "A") {
            if (regexp.test(cur.href)) {
              var url = decodeURIComponent(/.*link.zhihu.com\/\?target=(.*)/.exec(cur.href)[1]);
              console.log(url);
              window.open(url);
              return false;
            }

            break;
          }

          cur = cur.parentNode;
        }
      });
    }
  };

  var website = {
    regexp: /csdn/,
    init: function init($) {
      $("#article_content  a:not([name])").each(function (i, v) {
        var a = document.createElement("a");
        a.innerHTML = "<span onclick=\"window.open('".concat(v.href, "')\">").concat(v.innerText, "</>");
        v.replaceWith(a);
      });
    }
  };

  var modules = [website$2, website$1, website];

  (function () {
    var $ = window.$;

    var mather = function mather(regex, site) {
      if (regex.test(window.location.href)) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        site.init.apply(site, args);
      }
    };

    modules.forEach(function (v) {
      return mather(v.regexp, v, $);
    });
  })();

}());
