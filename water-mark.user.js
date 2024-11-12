// ==UserScript==
// @name        移除页面水印
// @description 移除常见网页的水印
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.0.1
// @author      Czy
// @match       *://so.csdn.net/*
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
    "opacity: 0 !important;",
    "visibility: hidden !important;",
    "transform: translate(-999999px, -999999px) !important;"
  ].join("");
  const OPACITY_BACKGROUND_PROPERTY = [
    "background: transparent !important;",
    "background-color: transparent !important;",
    "background-image: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)) !important;"
  ].join("");

  const lintWaterMarkDOM = (node) => {
    if (node instanceof Element && node.hasAttribute("style")) {
      const styles = node.getAttribute("style") || "";
      if (styles.indexOf("pointer-events: none;") === -1) {
        return false;
      }
      if (styles.indexOf("background: url") > -1 || styles.indexOf("background-image: url") > -1) {
        !node.classList.contains(FALLBACK_CLASS) && node.classList.add(FALLBACK_CLASS);
        return true;
      }
    }
    return false;
  };

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

  const common = {
    regexp: /.*/,
    init: () => {
      const observer = MutationObserver.prototype.observe;
      MutationObserver.prototype.observe = function(target, options) {
        lintWaterMarkDOM(target);
        target.childNodes.forEach(lintWaterMarkDOM);
        observer.call(this, target, options);
      };
      const _MutationObserver = MutationObserver;
      const cb = (callback) => {
        return (records, observer2) => {
          let isMatchedWaterMarkDOM = false;
          for (const record of records) {
            if (lintWaterMarkDOM(record.target) && !isMatchedWaterMarkDOM) {
              isMatchedWaterMarkDOM = true;
            }
          }
          !isMatchedWaterMarkDOM && callback(records, observer2);
        };
      };
      unsafeWindow.MutationObserver = class extends _MutationObserver {
        constructor(callback) {
          super(cb(callback));
        }
      };
      const PRESET_CLASSES = [
        "." + FALLBACK_CLASS,
        `[class*="watermark"]`,
        `[class*="WaterMark"]`
      ].join(",");
      injectCSSEarly(`${PRESET_CLASSES}{${OPACITY_PROPERTY}}`);
      const PRESET_BACKGROUND = [
        `[style*="pointer-events: none;"][style*="background: url"]`,
        `[style*="pointer-events: none;"][style*="background-image: url"]`
      ].join(",");
      injectCSSEarly(`${PRESET_BACKGROUND}{${OPACITY_BACKGROUND_PROPERTY}}`);
    }
  };

  const csdn = {
    regexp: /so\.csdn\.net/,
    init: () => {
      const observer = MutationObserver.prototype.observe;
      MutationObserver.prototype.observe = function(target, options) {
        if (target instanceof Element && target.classList.contains("chat-mask")) {
          const nodes = Array.from(target.children);
          nodes.forEach((node) => lintWaterMarkDOM(node));
          return;
        }
        observer.call(this, target, options);
      };
      const classes = ["." + FALLBACK_CLASS].join(",");
      injectCSSEarly(`${classes}{${OPACITY_PROPERTY}}`);
    }
  };

  const websites = [csdn, common];
  const web = websites.find((item) => item.regexp.test(location.href));
  web && web.init();

}());
