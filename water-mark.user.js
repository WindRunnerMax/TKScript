// ==UserScript==
// @name    🔥🔥🔥移除页面水印🔥🔥🔥
// @name:en Remove Page Watermark
// @name:zh 🔥🔥🔥移除页面水印🔥🔥🔥
// @description    移除常见网页的水印
// @description:en Remove watermarks from common web pages
// @description:zh 移除常见网页的水印
// @namespace  https://github.com/WindrunnerMax/TKScript
// @version    1.0.4
// @author     Czy
// @match      http://*/*
// @match      https://*/*
// @supportURL https://github.com/WindrunnerMax/TKScript/issues
// @license    GPL License
// @installURL https://github.com/WindrunnerMax/TKScript
// @run-at     document-start
// @grant      unsafeWindow
// ==/UserScript==
(function () {
  'use strict';

  const FALLBACK_CLASS = "__WATERMARK__";
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

  const inspectWaterMarkDOM = (node) => {
    if (node instanceof HTMLElement === false) {
      return false;
    }
    if (node.classList.contains(FALLBACK_CLASS)) {
      return true;
    }
    if (!node.hasAttribute("style") || node.style.pointerEvents !== "none") {
      return false;
    }
    if (node.style.background.startsWith("url") || node.style.backgroundImage.startsWith("url")) {
      !node.classList.contains(FALLBACK_CLASS) && node.classList.add(FALLBACK_CLASS);
      return true;
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

  const basic = {
    regexp: /.*/,
    init: () => {
      const observer = MutationObserver.prototype.observe;
      MutationObserver.prototype.observe = function(target, options) {
        inspectWaterMarkDOM(target);
        target.childNodes.forEach(inspectWaterMarkDOM);
        observer.call(this, target, options);
      };
      const _MutationObserver = MutationObserver;
      const getMutationCallback = (callback) => {
        return (records, observer2) => {
          let isMatchedWaterMarkDOM = false;
          for (const record of records) {
            if (inspectWaterMarkDOM(record.target) && !isMatchedWaterMarkDOM) {
              isMatchedWaterMarkDOM = true;
            }
          }
          !isMatchedWaterMarkDOM && callback(records, observer2);
        };
      };
      unsafeWindow.MutationObserver = class extends _MutationObserver {
        constructor(callback) {
          super(getMutationCallback(callback));
        }
      };
      const PRESET_CLASSES = [
        "." + FALLBACK_CLASS,
        `div[id*="watermark"]`,
        `div[id*="WaterMark"]`,
        `div[id*="Watermark"]`,
        `div[class*="watermark"]`,
        `div[class*="WaterMark"]`,
        `div[class*="Watermark"]`
      ].join(",");
      injectCSSEarly(`${PRESET_CLASSES}{${OPACITY_PROPERTY}}`);
      const PRESET_BACKGROUND = [
        `div[style*="pointer-events"][style*="background: url"]`,
        `div[style*="pointer-events"][style*="background-image: url"]`,
        `div[style*="pointer-events"][style*="background:url"]`,
        `div[style*="pointer-events"][style*="background-image:url"]`
      ].join(",");
      injectCSSEarly(`${PRESET_BACKGROUND}{${OPACITY_BACKGROUND_PROPERTY}}`);
    }
  };

  const websites = [basic];
  const web = websites.find((item) => item.regexp.test(location.href));
  web && web.init();

}());
