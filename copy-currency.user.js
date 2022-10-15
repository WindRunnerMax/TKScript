// ==UserScript==
// @name       🔥🔥🔥文本选中复制(通用)🔥🔥🔥
// @name:en    Text Copy Universal
// @name:zh-CN 🔥🔥🔥文本选中复制(通用)🔥🔥🔥
// @description       文本选中复制通用版本，适用于大多数网站
// @description:en    Text copy general version, suitable for most websites.
// @description:zh-CN 文本选中复制通用版本，适用于大多数网站
// @namespace  https://github.com/WindrunnerMax/TKScript
// @version    1.0.3
// @author     Czy
// @match      http://*/*
// @match      https://*/*
// @supportURL https://github.com/WindrunnerMax/TKScript/issues
// @license    GPL License
// @installURL https://github.com/WindrunnerMax/TKScript
// @run-at     document-start
// @grant      GM_registerMenuCommand
// @grant      GM_unregisterMenuCommand
// @grant      GM_notification
// ==/UserScript==
(function () {
    'use strict';

    var utils = {
      insertCSS: (id, css) => {
        const style = document.createElement("style");
        style.id = id;
        style.innerHTML = css;
        const head = document.getElementsByTagName("head")[0];
        if (head) {
          head.appendChild(style);
        } else {
          window.onload = () => document.getElementsByTagName("head")[0].appendChild(style);
        }
      },
      removeCSS: (id) => {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
      }
    };

    const STORAGE_VALUE = {
      OPEN: "true",
      CLOSE: "false"
    };
    const STORAGE_KEY_PREFIX = "copy-currency--";
    const stopNativePropagation = (event) => event.stopPropagation();
    const controllerMapper = [
      {
        status: 1 /* CLOSE */,
        storageKey: "selectstart-and-copy",
        openName: "\u2705 \u542F\u52A8\u89E3\u9664\u590D\u5236\u9650\u5236",
        closeName: "\u274C \u5173\u95ED\u89E3\u9664\u590D\u5236\u9650\u5236",
        openFunction: () => {
          document.addEventListener("selectstart", stopNativePropagation, true);
          document.addEventListener("copy", stopNativePropagation, true);
          utils.insertCSS(
            STORAGE_KEY_PREFIX + "selectstart-and-copy",
            "*{user-select: auto !important;-webkit-user-select: auto !important;}"
          );
        },
        closeFunction: () => {
          document.removeEventListener("selectstart", stopNativePropagation, true);
          document.removeEventListener("copy", stopNativePropagation, true);
          utils.removeCSS(STORAGE_KEY_PREFIX + "selectstart-and-copy");
        }
      },
      {
        status: 1 /* CLOSE */,
        storageKey: "contextmenu",
        openName: "\u2705 \u542F\u52A8\u89E3\u9664\u53F3\u952E\u9650\u5236",
        closeName: "\u274C \u5173\u95ED\u89E3\u9664\u53F3\u952E\u9650\u5236",
        openFunction: () => document.addEventListener("contextmenu", stopNativePropagation, true),
        closeFunction: () => document.removeEventListener("contextmenu", stopNativePropagation, true)
      },
      {
        status: 1 /* CLOSE */,
        storageKey: "keydown",
        openName: "\u2705 \u542F\u52A8\u89E3\u9664\u952E\u76D8\u9650\u5236",
        closeName: "\u274C \u5173\u95ED\u89E3\u9664\u952E\u76D8\u9650\u5236",
        openFunction: () => document.addEventListener("keydown", stopNativePropagation, true),
        closeFunction: () => document.removeEventListener("keydown", stopNativePropagation, true)
      }
    ];
    const menuIds = [];
    const switchFunctions = [];
    const batchUpdateButtons = () => {
      controllerMapper.forEach((item, index) => {
        GM_unregisterMenuCommand(menuIds[index]);
        if (item.status === 0 /* OPEN */) {
          menuIds[index] = GM_registerMenuCommand(item.closeName, switchFunctions[index]);
        } else {
          menuIds[index] = GM_registerMenuCommand(item.openName, switchFunctions[index]);
        }
      });
    };
    (function() {
      controllerMapper.forEach((item) => {
        const localHookInfo = localStorage.getItem(STORAGE_KEY_PREFIX + item.storageKey);
        const switchButtonStatus = () => {
          if (item.status === 0 /* OPEN */) {
            item.status = 1 /* CLOSE */;
            item.closeFunction();
            localStorage.setItem(STORAGE_KEY_PREFIX + item.storageKey, STORAGE_VALUE.CLOSE);
          } else {
            item.status = 0 /* OPEN */;
            item.openFunction();
            localStorage.setItem(STORAGE_KEY_PREFIX + item.storageKey, STORAGE_VALUE.OPEN);
          }
          batchUpdateButtons();
        };
        switchFunctions.push(switchButtonStatus);
        if (localHookInfo === STORAGE_VALUE.OPEN) {
          item.status = 0 /* OPEN */;
          item.openFunction();
        } else {
          item.status = 1 /* CLOSE */;
        }
      });
      batchUpdateButtons();
    })();

})();
