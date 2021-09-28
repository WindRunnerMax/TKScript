// ==UserScript==
// @name        🔥🔥🔥文本选中复制🔥🔥🔥
// @description 解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 无忧考网 学习啦 蓬勃范文 思否社区 力扣 知乎 语雀 等
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     2.2.7
// @author      Czy
// @include     *://wenku.baidu.com/view/*
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
// @include     *://www.ruiwen.com/*
// @include     *://www.uemeds.cn/*
// @include     *://www.oh100.com/*
// @include     *://www.aiyuke.com/news/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/meta/copy.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/copy.js
// @run-at      document-end
// @require     https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @connect     static.doc88.com
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

  var css_248z = "#_copy{width:60px;height:30px;background:#4c98f7;color:#fff;position:absolute;z-index:1000;display:flex;justify-content:center;align-items:center;border-radius:3px;font-size:13px;cursor:pointer}#select-tooltip,#sfModal,.modal-backdrop,div[id^=reader-helper]{display:none!important}.modal-open{overflow:auto!important}._sf_adjust_body{padding-right:0!important}";
  styleInject(css_248z);

  function initEvent($, ClipboardJS) {
    $("body").on("mousedown", function () {
      $("#_copy").remove();
    });

    document.oncopy = function (e) {
      return e.stopPropagation();
    };

    document.body.oncopy = function (e) {
      return e.stopPropagation();
    };

    $("body").on("copy", function (e) {
      e.stopPropagation();
      return true;
    });
    ClipboardJS.prototype.on("success", function (e) {
      $("#_copy").html("复制成功");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
    ClipboardJS.prototype.on("error", function (e) {
      $("#_copy").html("复制失败");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
  }

  var path = "";
  var website = {
    regexp: /.*doc88\.com\/.+/,
    init: function init($) {
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
        url: "https://static.doc88.com/resources/js/modules/main-v2.min.js?v=2.78",
        onload: function onload(response) {
          path = /<textarea[\s\S]+>'\+([\S]*?)\+"<\/textarea>/.exec(response.responseText)[1];
        }
      });
    },
    getSelectedText: function getSelectedText() {
      var select = unsafeWindow;
      path.split(".").forEach(function (v) {
        select = select[v];
      });
      return select;
    }
  };

  var website$1 = {
    regexp: /.*segmentfault\.com\/.+/,
    init: function init($) {
      $("body").addClass("_sf_adjust_body");
      $("body").on("click", function () {
        $("body").css("padding-right", 0);
      });
    }
  };

  var website$2 = {
    regexp: new RegExp("commandlinux|cnki|leetcode-cn|ruiwen|oh100"),
    init: function init($) {
      $("body").append("<style id=\"copy-hide\">#_copy{display: none !important;}</style>");
    },
    hideButton: function hideButton($) {
      this.init($);
    },
    showButton: function showButton($) {
      $("#copy-hide").remove();
    }
  };

  var website$3 = {
    regexp: /.*wk\.baidu\.com\/view\/.+/,
    init: function init($) {
      website$2.hideButton($);
      $(window).on("load", function () {
        $(".sf-edu-wenku-vw-container").attr("style", "");
        $(".sfa-body").on("selectstart", function (e) {
          e.stopPropagation();
          return true;
        });
      });
    }
  };

  var website$4 = {
    regexp: /.*zhihu\.com\/.*/,
    init: function init($) {
      website$2.hideButton($);
    }
  };

  var website$5 = {
    regexp: /.*zhihu\.com\/pub\/reader\/.+/,
    init: function init($) {
      setTimeout(website$2.showButton, 500, $);
    }
  };

  var website$6 = {
    regexp: /.*30edu\.com\.cn\/.+/,
    init: function init($) {
      window.onload = function () {
        var iframes = document.getElementsByTagName("iframe");

        if (iframes.length === 2) {
          var body = $(iframes[1].contentWindow.document.querySelector("body"));
          body.attr("oncopy", "");
          body.attr("oncontextmenu", "");
          body.attr("onselectstart", "");
        }
      };
    }
  };

  var website$7 = {
    regexp: /.*docs\.qq\.com\/.+/,
    init: function init($) {
      var hide = function hide() {
        return website$2.hideButton($);
      };

      if (unsafeWindow.pad) {
        if (unsafeWindow.pad.editor._docEnv.copyable === true) hide();
        unsafeWindow.pad.editor._docEnv.copyable = true;
      } else {
        hide();
      }
    },
    getSelectedText: function getSelectedText() {
      if (unsafeWindow.pad) {
        unsafeWindow.pad.editor.clipboardManager.copy();
        return unsafeWindow.pad.editor.clipboardManager.customClipboard.plain;
      }

      return void 0;
    }
  };

  var website$8 = {
    regexp: new RegExp(".+://boke112.com/post/.+"),
    init: function init($) {
      $("body").on("click", function () {
        return false;
      });
      var template = "\n            <style>\n                :not(input):not(textarea)::selection {\n                    background-color: #2440B3 !important;\n                    color: #fff !important;\n                }\n\n                :not(input):not(textarea)::-moz-selection {\n                    background-color: #2440B3 !important;\n                    color: #fff !important;\n                }\n            </style>\n        ";
      $("body").append(template.replace(/\s*/, " "));
    }
  };

  var website$9 = {
    regexp: /diyifanwen/,
    init: function init() {
      setTimeout(function () {
        document.oncopy = function (e) {
          return e.stopPropagation();
        };

        document.body.oncopy = function (e) {
          return e.stopPropagation();
        };
      }, 1000);
    }
  };

  var website$a = {
    regexp: /mbalib/,
    init: function init($) {
      window.onload = function () {
        var container = $("#fullScreenContainer");
        container.attr("oncopy", "");
        container.attr("oncontextmenu", "");
        container.attr("onselectstart", "");
      };
    }
  };

  var website$b = {
    regexp: /cnitpm/,
    init: function init($) {
      website$2.hideButton($);

      window.onload = function () {
        var container = $("body");
        container.attr("oncopy", "");
        container.attr("oncontextmenu", "");
        container.attr("onselectstart", "");
      };
    }
  };

  var website$c = {
    regexp: new RegExp(".+bbs.mihoyo.com/ys/obc.+"),
    init: function init($) {
      website$2.hideButton($);
      $(".detail__content").on("copy", function (e) {
        return e.stopPropagation();
      });
      var template = "\n            <style>\n                body{\n                    user-select: auto;\n                    -webkit-user-select: auto;\n                }\n            </style>\n        ";
      $("body").append(template.replace(/\s*/, " "));
    }
  };

  var website$d = {
    regexp: new RegExp(".+www.uemeds.cn/.+"),
    init: function init($) {
      website$2.hideButton($);
      var template = "\n            <style>\n                .detail-main{\n                    user-select: auto;\n                    -webkit-user-select: auto;\n                }\n            </style>\n        ";
      $("body").append(template.replace(/\s*/, " "));
    }
  };

  var website$e = {
    regexp: new RegExp(".+aiyuke.com/news/.+"),
    init: function init($) {
      website$2.hideButton($);
      $(".news_content_body").css("user-select", "auto");
    }
  };

  var siteGetSelectedText = null;
  var modules = [website, website$1, website$3, website$4, website$5, website$6, website$7, website$8, website$9, website$a, website$b, website$c, website$d, website$e, website$2];

  function initWebsite($) {
    var mather = function mather(regex, site) {
      if (regex.test(window.location.href)) {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        site.init.apply(site, args);
        if (site.getSelectedText) siteGetSelectedText = site.getSelectedText;
      }
    };

    modules.forEach(function (v) {
      return mather(v.regexp, v, $);
    });
  }

  function getSelectedText() {
    if (siteGetSelectedText) return siteGetSelectedText();
    if (window.getSelection) return window.getSelection().toString();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange().text;
    return "";
  }

  (function () {
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text

    initEvent($, ClipboardJS);
    initWebsite($);
    document.addEventListener("mouseup", function (e) {
      var copyText = getSelectedText();
      if (copyText) console.log(copyText);else return "";
      $("#_copy").remove();
      var template = "\n            <div id=\"_copy\"\n            style=\"left:".concat(e.pageX + 30, "px;top:").concat(e.pageY, "px;\"\n            data-clipboard-text=\"").concat(copyText.replace(/"/g, "&quot;"), "\">\u590D\u5236</div>\n        ");
      $("body").append(template);
      $("#_copy").on("mousedown", function (event) {
        event.stopPropagation();
      });
      $("#_copy").on("mouseup", function (event) {
        event.stopPropagation();
      });
      new ClipboardJS('#_copy');
    });
  })();
  /**
   * http://wenku.baiduvvv.com/
   * https://www.huiyingwu.com/1718/
   */

}());
