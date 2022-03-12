// ==UserScript==
// @name        🔥🔥🔥文本选中复制🔥🔥🔥
// @description 解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 无忧考网 学习啦 蓬勃范文 思否社区 力扣 知乎 语雀 等
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     3.1.7
// @author      Czy
// @include     *://wenku.baidu.com/view/*
// @include     *://wenku.baidu.com/share/*
// @include     *://wenku.baidu.com/link*
// @include     *://www.51test.net/show/*
// @include     *://www.xuexi.la/*
// @include     *://www.xuexila.com/*
// @include     *://www.cspengbo.com/*
// @include     *://*.doc88.com/*
// @include     *://segmentfault.com/*
// @include     *://wk.baidu.com/view/*
// @include     *://leetcode-cn.com/problems/*
// @include     *://www.zhihu.com/*
// @include     *://z.30edu.com.cn/*
// @include     *://docs.qq.com/doc/*
// @include     *://boke112.com/post/*
// @include     *://www.yuque.com/*
// @include     *://www.commandlinux.com/*
// @include     *://*.diyifanwen.com/*
// @include     *://*.mbalib.com/*
// @include     *://*.cnitpm.com/*
// @include     *://bbs.mihoyo.com/ys/obc/*
// @include     *://*.ruiwen.com/*
// @include     *://www.uemeds.cn/*
// @include     *://www.oh100.com/*
// @include     *://www.aiyuke.com/news/*
// @include     *://www.fwsir.com/*
// @include     *://www.wenxm.cn/*
// @include     *://www.unjs.com/*
// @include     *://www.ahsrst.cn/*
// @include     *://*.yjbys.com/*
// @include     *://*.qidian.com/*
// @include     *://*.zongheng.com/*
// @include     *://*.17k.com/*
// @include     *://*.ciweimao.com/*
// @include     *://book.qq.com/*
// @include     *://*.360doc.com/content/*
// @include     *://*.850500.com/news/*
// @include     *://utaten.com/lyric/*
// @include     *://*.jianbiaoku.com/*
// @include     *://*.kt250.com/*
// @include     *://www.kejudati.com/*
// @include     *://*.xiaohongshu.com/discovery/*
// @include     *://*.baibeike.com/*
// @include     *://*blog.csdn.net/*
// @include     *://*bilibili.com/read/*
// @include     *://*.cnki.net/KXReader/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/meta/copy.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/copy.user.js
// @run-at      document-end
// @require     https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js
// @require     https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/clipboard.js/2.0.10/clipboard.min.js
// @connect     res1.doc88.com
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

  var css_248z = "#_copy{align-items:center;background:#4c98f7;border-radius:3px;color:#fff;cursor:pointer;display:flex;font-size:13px;height:30px;justify-content:center;position:absolute;width:60px;z-index:1000}#select-tooltip,#sfModal,.modal-backdrop,div[id^=reader-helper]{display:none!important}.modal-open{overflow:auto!important}._sf_adjust_body{padding-right:0!important}";
  styleInject(css_248z);

  var initEvent = function ($, websiteConfig) {
      $("body").on("mousedown", function () { return $("#_copy").remove(); });
      if (websiteConfig.initCopyEvent) {
          document.oncopy = function (e) { return e.stopPropagation(); };
          document.body.oncopy = function (e) { return e.stopPropagation(); };
          $("body").on("copy", function (e) {
              e.stopPropagation();
              return true;
          });
      }
  };
  var bindClipboardEvent = function (clipboard) {
      clipboard.on("success", function (e) {
          $("#_copy").html("复制成功");
          setTimeout(function () { return $("#_copy").fadeOut(1000); }, 1000);
          e.clearSelection();
      });
      clipboard.on("error", function (e) {
          $("#_copy").html("复制失败");
          setTimeout(function () { return $("#_copy").fadeOut(1000); }, 1000);
          e.clearSelection();
      });
  };

  var path = "";
  var website$q = {
      regexp: /.*doc88\.com\/.+/,
      init: function ($) {
          // GM_xmlhttpRequest({
          //     method: "GET",
          //     url: "https://res.doc88.com/assets/js/v2.js",
          //     onload: function(response) {
          //         var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
          //         path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
          //     }
          // })
          $("body").append("<style id=\"copy-hide\">#left-menu{display: none !important;}</style>");
          GM_xmlhttpRequest({
              method: "GET",
              url: "https://res1.doc88.com/resources/js/modules/main-v2.min.js?v=2.90",
              onload: function (response) {
                  path = /<textarea[\s\S]+>'\+([\S]*?)\+"<\/textarea>/.exec(response.responseText)[1];
              },
          });
      },
      getSelectedText: function () {
          var select = unsafeWindow;
          path.split(".").forEach(function (v) {
              select = select[v];
          });
          return select;
      },
  };

  var website$p = {
      regexp: /.*segmentfault\.com\/.+/,
      init: function ($) {
          $("body").addClass("_sf_adjust_body");
          $("body").on("click", function () {
              $("body").css("padding-right", 0);
          });
      },
  };

  var stopJQueryPropagation = function (event) {
      event.stopPropagation();
      // event.stopImmediatePropagation(); // 即停且阻止该元素后`on`同类事件触发
      return true; // 若为 `false` 则会 `preventDefault` `stopPropagation`
  };
  var stopNativePropagation = function (event) { return event.stopPropagation(); };
  var utils = {
      hideButton: function ($) {
          $("body").append("<style id=\"copy-hide\">#_copy{display: none !important;}</style>");
      },
      showButton: function ($) {
          $("#copy-hide").remove();
      },
      removeAttributes: function ($, selector, attr) {
          if (attr === void 0) { attr = []; }
          var dom = $(selector);
          attr.forEach(function (item) { return dom.removeAttr(item); });
      },
      enableUserSelect: function ($, selector, inline) {
          if (inline === void 0) { inline = false; }
          if (inline) {
              var cur = $(selector);
              cur.css("user-select", "auto");
              cur.css("-webkit-user-select", "auto");
          }
          else {
              var template = "\n                <style>\n                    ".concat(selector, "{\n                        user-select: auto !important;\n                        -webkit-user-select: auto !important;\n                    }\n                </style>\n            ");
              $("body").append(template.replace(/\s*/, " "));
          }
      },
      enableOnSelectStart: function ($, selector) {
          $(selector).on("selectstart", stopJQueryPropagation);
      },
      enableOnContextMenu: function ($, selector) {
          $(selector).on("contextmenu", stopJQueryPropagation);
      },
      enableOnCopy: function ($, selector) {
          $(selector).on("copy", stopJQueryPropagation);
      },
      enableOnKeyDown: function ($, selector) {
          $(selector).on("keydown", function (e) {
              if (e.key === "c" && e.ctrlKey)
                  return stopJQueryPropagation(e);
          });
      },
      enableOnSelectStartByCapture: function () {
          document.addEventListener("selectstart", stopNativePropagation, true);
      },
      enableOnContextMenuByCapture: function () {
          document.addEventListener("contextmenu", stopNativePropagation, true);
      },
      enableOnCopyByCapture: function () {
          document.addEventListener("copy", stopNativePropagation, true);
      },
      enableOnKeyDownByCapture: function () {
          document.addEventListener("keydown", stopNativePropagation, true);
      },
  };

  var website$o = {
      regexp: /.*wk\.baidu\.com\/view\/.+/,
      init: function ($) {
          utils.hideButton($);
          $(window).on("load", function () {
              $(".sf-edu-wenku-vw-container").attr("style", "");
              $(".sfa-body").on("selectstart", function (e) {
                  e.stopPropagation();
                  return true;
              });
          });
      },
  };

  var website$n = {
      regexp: /.*zhihu\.com\/.*/,
      init: function ($) {
          utils.hideButton($);
      },
  };

  var website$m = {
      regexp: /.*zhihu\.com\/pub\/reader\/.+/,
      init: function ($) {
          setTimeout(utils.showButton, 500, $);
      },
  };

  var website$l = {
      regexp: /.*30edu\.com\.cn\/.+/,
      init: function ($) {
          window.onload = function () {
              var iframes = document.getElementsByTagName("iframe");
              if (iframes.length === 2) {
                  var body = $(iframes[1].contentWindow.document.querySelector("body"));
                  body.attr("oncopy", "");
                  body.attr("oncontextmenu", "");
                  body.attr("onselectstart", "");
              }
          };
      },
  };

  var restrictCopying = true;
  var website$k = {
      regexp: /.*docs\.qq\.com\/.+/,
      config: {
          initCopyEvent: false,
      },
      init: function ($) {
          window.onload = function () {
              if (unsafeWindow.pad) {
                  if (unsafeWindow.pad.editor._docEnv.copyable === true) {
                      // 不限制复制
                      restrictCopying = false;
                      utils.hideButton($);
                  }
                  else {
                      unsafeWindow.pad.editor._docEnv.copyable = true;
                  }
              }
              else {
                  restrictCopying = false;
                  utils.hideButton($);
              }
          };
      },
      getSelectedText: function () {
          if (!restrictCopying)
              return "";
          if (unsafeWindow.pad) {
              unsafeWindow.pad.editor._docEnv.copyable = true;
              unsafeWindow.pad.editor.clipboardManager.copy();
              return unsafeWindow.pad.editor.clipboardManager.customClipboard.plain;
          }
          return "";
      },
  };

  var website$j = {
      regexp: new RegExp(".+://boke112.com/post/.+"),
      init: function ($) {
          $("body").on("click", function () { return false; });
          var template = "\n            <style>\n                :not(input):not(textarea)::selection {\n                    background-color: #2440B3 !important;\n                    color: #fff !important;\n                }\n\n                :not(input):not(textarea)::-moz-selection {\n                    background-color: #2440B3 !important;\n                    color: #fff !important;\n                }\n            </style>\n        ";
          $("body").append(template.replace(/\s*/, " "));
      },
  };

  var website$i = {
      regexp: /diyifanwen/,
      init: function () {
          setTimeout(function () {
              document.oncopy = function (e) { return e.stopPropagation(); };
              document.body.oncopy = function (e) { return e.stopPropagation(); };
          }, 1000);
      },
  };

  var website$h = {
      regexp: /mbalib/,
      init: function ($) {
          window.onload = function () {
              var container = $("#fullScreenContainer");
              container.attr("oncopy", "");
              container.attr("oncontextmenu", "");
              container.attr("onselectstart", "");
          };
      },
  };

  var website$g = {
      regexp: /cnitpm/,
      init: function ($) {
          utils.hideButton($);
          window.onload = function () {
              var container = $("body");
              container.attr("oncopy", "");
              container.attr("oncontextmenu", "");
              container.attr("onselectstart", "");
          };
      },
  };

  var website$f = {
      regexp: new RegExp(".+bbs.mihoyo.com/ys/obc.+"),
      init: function ($) {
          utils.hideButton($);
          $(".detail__content").on("copy", function (e) { return e.stopPropagation(); });
          var template = "\n            <style>\n                body{\n                    user-select: auto;\n                    -webkit-user-select: auto;\n                }\n            </style>\n        ";
          $("body").append(template.replace(/\s*/, " "));
      },
  };

  var website$e = {
      regexp: new RegExp(".+www.uemeds.cn/.+"),
      init: function ($) {
          utils.hideButton($);
          var template = "\n            <style>\n                .detail-main{\n                    user-select: auto;\n                    -webkit-user-select: auto;\n                }\n            </style>\n        ";
          $("body").append(template.replace(/\s*/, " "));
      },
  };

  var website$d = {
      regexp: new RegExp(".+aiyuke.com/news/.+"),
      init: function ($) {
          utils.hideButton($);
          $(".news_content_body").css("user-select", "auto");
      },
  };

  var website$c = {
      regexp: new RegExp("qidian"),
      init: function ($) {
          utils.hideButton($);
          utils.enableUserSelect($, "body");
          utils.enableOnCopy($, ".main-read-container");
          utils.enableOnContextMenu($, ".main-read-container");
      },
  };

  var website$b = {
      regexp: new RegExp("zongheng"),
      init: function ($) {
          utils.removeAttributes($, ".reader_box", ["style", "unselectable", "onselectstart"]);
          utils.removeAttributes($, ".reader_main", ["style", "unselectable", "onselectstart"]);
          utils.hideButton($);
          utils.enableOnKeyDown($, "body");
          utils.enableUserSelect($, ".reader_box .content p");
          utils.enableOnCopy($, ".content");
          utils.enableOnContextMenu($, "body");
          utils.enableOnSelectStart($, ".content");
      },
  };

  var website$a = {
      regexp: new RegExp("17k"),
      init: function ($) {
          utils.hideButton($);
          utils.enableOnCopy($, ".readAreaBox .p");
      },
  };

  var website$9 = {
      regexp: new RegExp("ciweimao"),
      init: function ($) {
          utils.hideButton($);
          utils.enableUserSelect($, "#J_BookRead");
          utils.enableOnCopy($, "#J_BookCnt");
          utils.enableOnContextMenu($, "body");
          utils.enableOnSelectStart($, "#J_BookCnt");
      },
  };

  var website$8 = {
      regexp: new RegExp("book\\.qq"),
      init: function ($) {
          utils.hideButton($);
          utils.enableUserSelect($, "body");
          utils.enableOnCopy($, "body");
          utils.enableOnContextMenu($, "body");
          utils.enableOnSelectStart($, "body");
      },
  };

  var website$7 = {
      regexp: new RegExp("utaten"),
      init: function ($) {
          utils.removeAttributes($, "body", ["oncontextmenu", "onselectstart"]);
          utils.hideButton($);
          utils.enableUserSelect($, ".lyricBody", true);
      },
  };

  var website$6 = {
      regexp: new RegExp("wenku.baidu.com/view/.*"),
      init: function ($) {
          utils.enableOnKeyDownByCapture();
          $("head").append("<style>@media print { body{ display:block; } }</style>");
      },
      getSelectedText: function () {
          if (window.getSelection && window.getSelection().toString()) {
              return window.getSelection().toString();
          }
          var result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
          if (result)
              return result[1];
          return "";
      },
  };

  var website$5 = {
      regexp: new RegExp("xiaohongshu"),
      init: function ($) {
          utils.hideButton($);
          utils.enableUserSelect($, "*");
          utils.enableOnKeyDownByCapture();
      },
  };

  var website$4 = {
      regexp: new RegExp("leetcode"),
      init: function ($) {
          utils.hideButton($);
          utils.enableOnCopy($, "#lc-home");
      },
  };

  var website$3 = {
      regexp: /csdn/,
      init: function ($) {
          utils.hideButton($);
          utils.enableOnCopyByCapture();
          utils.enableUserSelect($, "*");
      },
  };

  var website$2 = {
      regexp: new RegExp("bilibili"),
      init: function ($) {
          utils.hideButton($);
          utils.enableOnCopyByCapture();
      },
  };

  var website$1 = {
      regexp: new RegExp("cnki"),
      init: function ($) {
          utils.hideButton($);
          utils.enableOnContextMenuByCapture();
          utils.enableOnKeyDownByCapture();
          utils.enableOnCopyByCapture();
      },
  };

  var website = {
      regexp: new RegExp([
          "commandlinux",
          "cnki",
          "ruiwen",
          "oh100",
          "fwsir",
          "wenxm",
          "unjs",
          "ahsrst",
          "yjbys",
          "360doc",
          "850500",
          "jianbiaoku",
          "kt250",
          "kejudati",
          "baibeike",
          "yuque",
      ].join("|")),
      init: function ($) {
          utils.hideButton($);
      },
  };

  var websites = [
      website$q,
      website$p,
      website$o,
      website$n,
      website$m,
      website$l,
      website$k,
      website$j,
      website$i,
      website$h,
      website$g,
      website$f,
      website$e,
      website$d,
      website$c,
      website$b,
      website$a,
      website$9,
      website$8,
      website$7,
      website$6,
      website$5,
      website$4,
      website$3,
      website$2,
      website$1,
      website,
  ];

  var siteGetSelectedText = null;
  var initWebsite = function ($) {
      var websiteConfig = {
          initCopyEvent: true,
      };
      var mather = function (regex, website) {
          if (regex.test(window.location.href)) {
              website.init($);
              if (website.config)
                  websiteConfig = Object.assign(websiteConfig, website.config);
              if (website.getSelectedText)
                  siteGetSelectedText = website.getSelectedText;
              return true;
          }
          return false;
      };
      websites.some(function (website) { return mather(website.regexp, website); });
      return websiteConfig;
  };
  var getSelectedText = function () {
      if (siteGetSelectedText)
          return siteGetSelectedText();
      if (window.getSelection)
          return window.getSelection().toString();
      if (document.getSelection)
          return document.getSelection().toString();
      if (document.selection)
          return document.selection.createRange().text;
      return "";
  };

  (function () {
      var $ = window.$;
      var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text
      var websiteConfig = initWebsite($);
      initEvent($, websiteConfig);
      document.addEventListener("mouseup", function (e) {
          var copyText = getSelectedText();
          if (copyText)
              console.log(copyText);
          else
              return "";
          $("#_copy").remove();
          var template = "\n            <div id=\"_copy\"\n            style=\"left:".concat(e.pageX + 30, "px;top:").concat(e.pageY, "px;\"\n            data-clipboard-text=\"").concat(copyText.replace(/"/g, "&quot;"), "\">\u590D\u5236</div>\n        ");
          $("body").append(template);
          $("#_copy").on("mousedown", function (event) { return event.stopPropagation(); });
          $("#_copy").on("mouseup", function (event) { return event.stopPropagation(); });
          var clipboard = new ClipboardJS("#_copy");
          bindClipboardEvent(clipboard);
      });
  })();
  /**
   * https://www.huiyingwu.com/1718/
   */

})();
