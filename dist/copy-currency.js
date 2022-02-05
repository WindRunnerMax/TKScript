// ==UserScript==
// @name        🔥🔥🔥文本选中复制(通用)🔥🔥🔥
// @description 文本选中复制通用版本，适用于大多数网站
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     1.0.0
// @author      Czy
// @include     http://*/*
// @include     https://*/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @updateURL   https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/meta/copy-currency.meta.js
// @downloadURL https://cdn.jsdelivr.net/gh/WindrunnerMax/TKScript/dist/copy-currency.js
// @run-at      document-start
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// @grant       GM_notification
// ==/UserScript==
(function () {
    'use strict';

    var utils = {
        insertCSS: function (id, css) {
            var style = document.createElement("style");
            style.id = id;
            style.innerHTML = css;
            document.getElementsByTagName("head")[0].appendChild(style);
        },
        removeCSS: function (id) {
            document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
        },
    };

    var BUTTON_STATUS;
    (function (BUTTON_STATUS) {
        BUTTON_STATUS[BUTTON_STATUS["OPEN"] = 0] = "OPEN";
        BUTTON_STATUS[BUTTON_STATUS["CLOSE"] = 1] = "CLOSE";
    })(BUTTON_STATUS || (BUTTON_STATUS = {}));
    var STORAGE_VALUE = {
        OPEN: "true",
        CLOSE: "false",
    };
    var STORAGE_KEY_PREFIX = "copy-currency--";
    var stopNativePropagation = function (event) { return event.stopPropagation(); };
    var controllerMapper = [
        {
            status: BUTTON_STATUS.CLOSE,
            storageKey: "selectstart-and-copy",
            openName: "✅ 启动解除复制限制",
            closeName: "❌ 关闭解除复制限制",
            openFunction: function () {
                document.addEventListener("selectstart", stopNativePropagation, true);
                document.addEventListener("copy", stopNativePropagation, true);
                utils.insertCSS(STORAGE_KEY_PREFIX + "selectstart-and-copy", "*{user-select: auto !important;-webkit-user-select: auto !important;}");
            },
            closeFunction: function () {
                document.removeEventListener("selectstart", stopNativePropagation, true);
                document.removeEventListener("copy", stopNativePropagation, true);
                utils.removeCSS(STORAGE_KEY_PREFIX + "selectstart-and-copy");
            },
        },
        {
            status: BUTTON_STATUS.CLOSE,
            storageKey: "contextmenu",
            openName: "✅ 启动解除右键限制",
            closeName: "❌ 关闭解除右键限制",
            openFunction: function () { return document.addEventListener("contextmenu", stopNativePropagation, true); },
            closeFunction: function () {
                return document.removeEventListener("contextmenu", stopNativePropagation, true);
            },
        },
        {
            status: BUTTON_STATUS.CLOSE,
            storageKey: "keydown",
            openName: "✅ 启动解除键盘限制",
            closeName: "❌ 关闭解除键盘限制",
            openFunction: function () { return document.addEventListener("keydown", stopNativePropagation, true); },
            closeFunction: function () { return document.removeEventListener("keydown", stopNativePropagation, true); },
        },
    ];
    var menuIds = [];
    var switchFunctions = [];
    var batchUpdateButtons = function () {
        controllerMapper.forEach(function (item, index) {
            GM_unregisterMenuCommand(menuIds[index]);
            if (item.status === BUTTON_STATUS.OPEN) {
                menuIds[index] = GM_registerMenuCommand(item.closeName, switchFunctions[index]);
            }
            else {
                menuIds[index] = GM_registerMenuCommand(item.openName, switchFunctions[index]);
            }
        });
    };
    (function () {
        controllerMapper.forEach(function (item) {
            var localHookInfo = localStorage.getItem(STORAGE_KEY_PREFIX + item.storageKey);
            var switchButtonStatus = function () {
                if (item.status === BUTTON_STATUS.OPEN) {
                    item.status = BUTTON_STATUS.CLOSE;
                    item.closeFunction();
                    localStorage.setItem(STORAGE_KEY_PREFIX + item.storageKey, STORAGE_VALUE.CLOSE);
                }
                else {
                    item.status = BUTTON_STATUS.OPEN;
                    item.openFunction();
                    localStorage.setItem(STORAGE_KEY_PREFIX + item.storageKey, STORAGE_VALUE.OPEN);
                }
                batchUpdateButtons();
            };
            switchFunctions.push(switchButtonStatus);
            if (localHookInfo === STORAGE_VALUE.OPEN) {
                item.status = BUTTON_STATUS.OPEN;
                item.openFunction();
            }
            else {
                item.status = BUTTON_STATUS.CLOSE;
            }
        });
        batchUpdateButtons();
    })();

})();
