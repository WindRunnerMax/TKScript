// ==UserScript==
// @name        🔥🔥🔥文本选中复制🔥🔥🔥
// @description 解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 无忧考网 学习啦 蓬勃范文 思否社区 力扣 知乎 语雀 等
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     3.3.10
// @author      Czy
// @match       *://wenku.baidu.com/view/*
// @match       *://wenku.baidu.com/share/*
// @match       *://wenku.baidu.com/link*
// @match       *://wenku.baidu.com/ndPureView/*
// @match       *://www.51test.net/show/*
// @match       *://www.xuexi.la/*
// @match       *://www.xuexila.com/*
// @match       *://www.cspengbo.com/*
// @match       *://*.doc88.com/*
// @match       *://segmentfault.com/*
// @match       *://wk.baidu.com/view/*
// @match       *://leetcode-cn.com/problems/*
// @match       *://www.zhihu.com/*
// @match       *://z.30edu.com.cn/*
// @match       *://docs.qq.com/doc/*
// @match       *://boke112.com/post/*
// @match       *://www.yuque.com/*
// @match       *://www.commandlinux.com/*
// @match       *://*.diyifanwen.com/*
// @match       *://*.mbalib.com/*
// @match       *://*.cnitpm.com/*
// @match       *://bbs.mihoyo.com/ys/obc/*
// @match       *://*.ruiwen.com/*
// @match       *://www.uemeds.cn/*
// @match       *://www.oh100.com/*
// @match       *://www.aiyuke.com/news/*
// @match       *://www.fwsir.com/*
// @match       *://www.wenxm.cn/*
// @match       *://www.unjs.com/*
// @match       *://www.ahsrst.cn/*
// @match       *://*.yjbys.com/*
// @match       *://*.qidian.com/*
// @match       *://*.zongheng.com/*
// @match       *://*.17k.com/*
// @match       *://*.ciweimao.com/*
// @match       *://book.qq.com/*
// @match       *://*.360doc.com/content/*
// @match       *://*.850500.com/news/*
// @match       *://utaten.com/lyric/*
// @match       *://*.jianbiaoku.com/*
// @match       *://*.kt250.com/*
// @match       *://www.kejudati.com/*
// @match       *://*.xiaohongshu.com/discovery/*
// @match       *://*.baibeike.com/*
// @match       *://*.blog.csdn.net/*
// @match       *://*.bilibili.com/read/*
// @match       *://*.cnki.net/KXReader/*
// @match       *://*.cnrencai.com/*
// @match       *://*.kodiplayer.cn/*
// @match       *://tongxiehui.net/*
// @match       *://*.jianshu.com/p/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/meta/copy.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript@master/dist/copy.user.js
// @run-at      document-start
// @require     https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/jquery/3.6.0/jquery.min.js
// @require     https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/clipboard.js/2.0.10/clipboard.min.js
// @connect     res3.doc88.com
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
      document.addEventListener("DOMContentLoaded", function () {
          $("body").on("mousedown", function () { return $("#_copy").remove(); });
          if (websiteConfig.initCopyEvent) {
              document.oncopy = function (e) { return e.stopPropagation(); };
              document.body.oncopy = function (e) { return e.stopPropagation(); };
              $("body").on("copy", function (e) {
                  e.stopPropagation();
                  return true;
              });
          }
      });
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

  /**
   * 外部引用`static.doc88.com`声明
   * 此部分是在处理`doc88.com`才会加载的资源文件，此资源文件由该网站加载时提供
   */
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
          $("body").append("<style id=\"copy-element-hide\">#left-menu{display: none !important;}</style>");
          GM_xmlhttpRequest({
              method: "GET",
              url: "https://res3.doc88.com/resources/js/modules/main-v2.min.js?v=2.56",
              onload: function (response) {
                  var result = /\("#cp_textarea"\).val\(([\S]*?)\);/.exec(response.responseText);
                  if (result)
                      path = result[1];
              },
          });
          window.addEventListener("load", function () {
              var cpFn = unsafeWindow.copyText.toString();
              var fnResult = /<textarea[\s\S]*?>'\+([\S]*?)\+"<\/textarea>/.exec(cpFn);
              if (fnResult)
                  path = fnResult[1];
          });
      },
      getSelectedText: function () {
          var select = unsafeWindow;
          path.split(".").forEach(function (v) {
              select = select[v];
          });
          if (!select) {
              unsafeWindow.Config.vip = 1;
              unsafeWindow.Config.logined = 1;
              $("#copy-element-hide").remove();
          }
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
          utils.hideButton($);
          utils.enableOnCopyByCapture();
          utils.enableOnKeyDownByCapture();
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
      config: {
          runAt: "document-start",
      },
      regexp: new RegExp("wenku.baidu.com/(view|link).*"),
      init: function ($) {
          $("head").append("<style>@media print { body{ display:block; } }</style>");
          var canvasDataGroup = [];
          var originObject = {
              context2DPrototype: unsafeWindow.document.createElement("canvas").getContext("2d")
                  .__proto__,
          };
          document.createElement = new Proxy(document.createElement, {
              apply: function (target, thisArg, argumentsList) {
                  var element = Reflect.apply(target, thisArg, argumentsList);
                  if (argumentsList[0] === "canvas") {
                      var tmpData_1 = {
                          canvas: element,
                          data: [],
                      };
                      element.getContext("2d").fillText = function () {
                          var args = [];
                          for (var _i = 0; _i < arguments.length; _i++) {
                              args[_i] = arguments[_i];
                          }
                          tmpData_1.data.push(args);
                          originObject.context2DPrototype.fillText.apply(this, args);
                      };
                      canvasDataGroup.push(tmpData_1);
                  }
                  return element;
              },
          });
          var pageData = {};
          Object.defineProperty(unsafeWindow, "pageData", {
              set: function (v) { return (pageData = v); },
              get: function () {
                  if (!pageData.vipInfo)
                      return (pageData.vipInfo = {});
                  pageData.vipInfo.global_svip_status = 1;
                  pageData.vipInfo.global_vip_status = 1;
                  pageData.vipInfo.isVip = 1;
                  pageData.vipInfo.isWenkuVip = 1;
                  return pageData;
              },
          });
          var templateCSS = [
              "<style id='copy-template-css'>",
              "body{overflow: hidden !important}",
              "#copy-template-html{position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center;z-index: 999999; background: rgba(0,0,0,0.5);}",
              "#copy-template-html > .template-container{height: 80%; width: 80%; background: #fff; }",
              ".template-container > .title-container{display: flex; align-items: center; justify-content: space-between;padding: 10px;border-bottom: 1px solid #eee;}",
              "#copy-template-text{height: 100%; width: 100%;position: relative; overflow: auto;background: #fff;}",
              "#copy-template-html #template-close{cursor: pointer;}",
              "</style>",
          ].join("");
          var render = function () {
              canvasDataGroup = canvasDataGroup.filter(function (item) { return item.canvas.id; });
              var templateText = canvasDataGroup.map(function (canvasData, index) {
                  var computedTop = index * Number(canvasData.canvas.clientHeight);
                  var textItem = canvasData.data.map(function (item) {
                      return "<div style=\"position: absolute; left: ".concat(item[1], "px; top: ").concat(item[2] + computedTop, "px\">").concat(item[0], "</div>");
                  });
                  return textItem.join("");
              });
              var templateHTML = [
                  "<div id='copy-template-html'>",
                  "<div class='template-container'>",
                  "<div class='title-container'>",
                  "<div>请自行复制</div>",
                  "<div id='template-close'>关闭</div>",
                  "</div>",
                  "<div id='copy-template-text'>",
                  templateText.join(""),
                  "</div>",
                  "</div>",
                  "</div>",
              ].join("");
              $("body").append(templateHTML);
              $("body").append(templateCSS);
              var closeButton = document.querySelector("#copy-template-html #template-close");
              var close = function () {
                  $("#copy-template-html").remove();
                  $("#copy-template-css").remove();
                  closeButton.removeEventListener("click", close);
              };
              closeButton.addEventListener("click", close);
          };
          document.addEventListener("DOMContentLoaded", function () {
              $("head").append("<style>#copy-btn-wk{padding: 10px; background: rgba(0,0,0,0.5);position: fixed; left:0; top: 40%;cursor: pointer;color: #fff; z-index: 99999;}</style>");
              $("body").append("<div id='copy-btn-wk'>复制</div>");
              $("#copy-btn-wk").on("click", render);
          });
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
          "cnrencai",
          "kodiplayer",
          "tongxiehui",
          "ndPureView",
          "jianshu",
      ].join("|")),
      init: function ($) {
          utils.hideButton($);
          utils.enableUserSelect($, "*");
          utils.enableOnCopyByCapture();
      },
  };

  var websites = [
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
      website$q,
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
          runAt: "document-end",
      };
      var mather = function (regex, website) {
          if (regex.test(window.location.href)) {
              if (website.config)
                  websiteConfig = Object.assign(websiteConfig, website.config);
              if (websiteConfig.runAt === "document-end") {
                  document.addEventListener("DOMContentLoaded", function () { return website.init($); });
              }
              else {
                  website.init($);
              }
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
