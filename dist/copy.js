// ==UserScript==
// @name        文本选中复制
// @description 文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 无忧考网 学习啦 蓬勃范文
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     2.0.0
// @author      Czy
// @include     *://wenku.baidu.com/view/*
// @include     *://www.51test.net/show/*
// @include     *://www.xuexi.la/*
// @include     *://www.xuexila.com/*
// @include     *://www.cspengbo.com/*
// @include     *://www.doc88.com/*
// @license     GPL License
// @require     https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @require     https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @connect     res.doc88.com
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

  var css_248z = "#_copy{width:60px;height:30px;background:#4c98f7;color:#fff;position:absolute;z-index:1000;display:flex;justify-content:center;align-items:center;border-radius:3px;font-size:13px;cursor:pointer}div[id^=reader-helper]{display:none!important}";
  styleInject(css_248z);

  function initEvent($, ClipboardJS) {
    $("body").on("mousedown", function (e) {
      $("#_copy").remove();
    });

    document.oncopy = function () {};

    $("body").on("copy", function (e) {
      e.stopPropagation();
      return true;
    });
    ClipboardJS.prototype.on('success', function (e) {
      $("#_copy").html("复制成功");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
    ClipboardJS.prototype.on('error', function (e) {
      $("#_copy").html("复制失败");
      setTimeout(function () {
        return $("#_copy").fadeOut(1000);
      }, 1000);
      e.clearSelection();
    });
  }

  var path = "";

  function init() {
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://res.doc88.com/assets/js/v2.js",
      onload: function onload(response) {
        var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
        path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
      }
    });
  }

  function getSelectedText() {
    return unsafeWindow.Viewer[path];
  }

  var doc88 = {
    init: init,
    getSelectedText: getSelectedText
  };

  function initWebsite($, ClipboardJS) {
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) doc88.init();
  }

  function getSelectedText$1() {
    if (window.location.href.match(/.*www\.doc88\.com\/.+/)) return doc88.getSelectedText();
    if (window.getSelection) return window.getSelection().toString();else if (document.getSelection) return document.getSelection();else if (document.selection) return document.selection.createRange().text;
    return "";
  }

  (function () {
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text

    initEvent($, ClipboardJS);
    initWebsite();
    document.addEventListener("mouseup", function (e) {
      var copyText = getSelectedText$1();
      if (copyText) console.log(copyText);else return "";
      $("#_copy").remove();
      var template = "\n            <div id=\"_copy\"\n            style=\"left:".concat(e.pageX + 30, "px;top:").concat(e.pageY, "px;\"\n            data-clipboard-text=\"").concat(copyText, "\">\u590D\u5236</div>\n        ");
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
   * https://www.wenku.zone/
   * http://wenku.baiduvvv.com/
   * https://www.huiyingwu.com/1718/
   */

}());
