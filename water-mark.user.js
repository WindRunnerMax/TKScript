// ==UserScript==
// @name        移除页面水印
// @description 移除常见网页的水印
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.0.0
// @author      Czy
// @match       *://so.csdn.net/*
// @match       *://*.feishu.cn/*
// @match       *://*.larkoffice.com/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @run-at      document-start
// @grant       unsafeWindow
// ==/UserScript==
(function () {
  'use strict';

  const FALLBACK_CLASS = "_watermark";
  const OPACITY_PROPERTY = [
    "opacity:0 !important;",
    "pointer-events:none !important;",
    "visibility:hidden !important;"
  ].join("");

  const styles = {
    insertCSS: (id, css) => {
      const style = document.createElement("style");
      style.id = id;
      style.innerText = css;
      const [body] = document.getElementsByTagName("body");
      if (body) {
        body.appendChild(style);
      } else {
        window.addEventListener("DOMContentLoaded", () => document.body.appendChild(style));
      }
    },
    removeCSS: (id) => {
      const style = document.getElementById(id);
      style && style.remove();
    }
  };

  const injectCSSEarly = (css) => {
    const style = document.createElement("style");
    style.innerText = css;
    const head = document.head;
    if (head) {
      head.appendChild(style);
      return;
    }
    const html = document.documentElement;
    if (html) {
      html.appendChild(style);
      return;
    }
    styles.insertCSS(String(Math.random()), css);
  };

  const csdn = {
    regexp: /so\.csdn\.net/,
    init: () => {
      const observer = MutationObserver.prototype.observe;
      MutationObserver.prototype.observe = function(target, options) {
        if (target instanceof Element && target.classList.contains("chat-mask")) {
          const nodes = Array.from(target.children);
          nodes.forEach((node) => {
            const styles = node.getAttribute("style") || "";
            if (styles.indexOf("data:image/") > -1 && styles.indexOf("background-image") > -1 && !node.classList.contains(FALLBACK_CLASS)) {
              node.classList.add(FALLBACK_CLASS);
            }
          });
          return;
        }
        observer.call(this, target, options);
      };
      const classes = ["." + FALLBACK_CLASS].join(",");
      injectCSSEarly(`${classes}{${OPACITY_PROPERTY}}`);
    }
  };

  const feishu = {
    regexp: /(feishu\.cn)|(larkoffice\.com)/,
    init: () => {
      const _MutationObserver = MutationObserver;
      const cb = (records) => {
        records.forEach((r) => {
          if (r.target instanceof Element && r.target.hasAttribute("style")) {
            const el = r.target;
            const styles = el.getAttribute("style") || "";
            if (styles.indexOf("data:image/") > -1 && styles.indexOf("background-image") > -1 && !el.classList.contains(FALLBACK_CLASS)) {
              el.classList.add(FALLBACK_CLASS);
            }
          }
        });
      };
      unsafeWindow.MutationObserver = class extends _MutationObserver {
        constructor(callback) {
          const fn = callback.toString();
          const isWatermark = /watermark/.test(fn);
          super(isWatermark ? cb : callback);
        }
      };
      const classes = [
        "." + FALLBACK_CLASS,
        ".token-watermark-bg",
        ".ssrWaterMark",
        ".ssrHiddenWaterMark",
        ".print-watermark",
        ".suite-clear"
      ].join(",");
      injectCSSEarly(`${classes}{${OPACITY_PROPERTY}}`);
    }
  };

  const websites = [feishu, csdn];
  const web = websites.find((item) => item.regexp.test(location.href));
  web && web.init();

}());
