// ==UserScript==
// @name    🔥🔥🔥文本选中复制(通用)🔥🔥🔥
// @name:en Text Copy Universal
// @name:zh 🔥🔥🔥文本选中复制(通用)🔥🔥🔥
// @description    文本选中复制通用版本，适用于大多数网站
// @description:en Text copy general version, suitable for most websites.
// @description:zh 文本选中复制通用版本，适用于大多数网站
// @namespace  https://github.com/WindrunnerMax/TKScript
// @version    1.1.3
// @author     Czy
// @match      http://*/*
// @match      https://*/*
// @supportURL https://github.com/WindrunnerMax/TKScript/issues
// @license    GPL License
// @installURL https://github.com/WindrunnerMax/TKScript
// @run-at     document-end
// @grant      GM_registerMenuCommand
// @grant      GM_unregisterMenuCommand
// @grant      GM_notification
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

  var css_248z = ".__copy-currency-container{background-color:#4c98f7;border-radius:3px;bottom:0;display:flex;flex-direction:column;left:-150px;position:fixed;transition:all .3s;width:150px;z-index:9999999999}.__copy-currency-container:before{background-color:#4c98f7;border-radius:20px;content:\"\";cursor:pointer;height:20px;position:absolute;right:-6px;top:calc(50% - 10px);width:20px}.__copy-currency-container:hover{left:0}.__copy-currency-container>.__copy-currency-button{border:1px solid #fff;border-radius:3px;color:#fff!important;cursor:pointer;font-size:12px!important;margin:5px;padding:5px 3px 5px 4px;text-align:center;user-select:none;z-index:9999999999}";
  styleInject(css_248z);

  const STORAGE_VALUE = {
    OPEN: "true",
    CLOSE: "false"
  };
  var BUTTON_STATUS = /* @__PURE__ */ ((BUTTON_STATUS2) => {
    BUTTON_STATUS2[BUTTON_STATUS2["OPEN"] = 0] = "OPEN";
    BUTTON_STATUS2[BUTTON_STATUS2["CLOSE"] = 1] = "CLOSE";
    return BUTTON_STATUS2;
  })(BUTTON_STATUS || {});
  const STORAGE_KEY_PREFIX = "copy-currency--";
  const register = (controllers) => {
    const container = document.createElement("div");
    container.className = "__copy-currency-container";
    document.body.appendChild(container);
    controllers.forEach((controller) => {
      const button = document.createElement("div");
      button.className = "__copy-currency-button";
      const localHookInfo = localStorage.getItem(STORAGE_KEY_PREFIX + controller.storageKey);
      controller.status = localHookInfo === STORAGE_VALUE.OPEN ? 1 /* CLOSE */ : 0 /* OPEN */;
      const handler = () => {
        if (controller.status === 1 /* CLOSE */) {
          controller.openFunction();
          controller.status = 0 /* OPEN */;
          button.textContent = controller.closeName;
          localStorage.setItem(STORAGE_KEY_PREFIX + controller.storageKey, STORAGE_VALUE.OPEN);
        } else {
          controller.closeFunction();
          controller.status = 1 /* CLOSE */;
          button.textContent = controller.openName;
          localStorage.setItem(STORAGE_KEY_PREFIX + controller.storageKey, STORAGE_VALUE.CLOSE);
        }
      };
      handler();
      button.addEventListener("click", handler);
      container.appendChild(button);
    });
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

  const stopNativePropagation = (event) => event.stopPropagation();
  const CONTROLLER_MAP = [
    {
      status: BUTTON_STATUS.CLOSE,
      storageKey: "selectstart-and-copy",
      openName: "✅ 启动解除复制限制",
      closeName: "❌ 关闭解除复制限制",
      openFunction: () => {
        window.addEventListener("selectstart", stopNativePropagation, true);
        window.addEventListener("copy", stopNativePropagation, true);
        styles.insertCSS(
          STORAGE_KEY_PREFIX + "selectstart-and-copy",
          "*{user-select: auto !important;-webkit-user-select: auto !important;}"
        );
      },
      closeFunction: () => {
        window.removeEventListener("selectstart", stopNativePropagation, true);
        window.removeEventListener("copy", stopNativePropagation, true);
        styles.removeCSS(STORAGE_KEY_PREFIX + "selectstart-and-copy");
      }
    },
    {
      status: BUTTON_STATUS.CLOSE,
      storageKey: "contextmenu",
      openName: "✅ 启动解除右键限制",
      closeName: "❌ 关闭解除右键限制",
      openFunction: () => window.addEventListener("contextmenu", stopNativePropagation, true),
      closeFunction: () => window.removeEventListener("contextmenu", stopNativePropagation, true)
    },
    {
      status: BUTTON_STATUS.CLOSE,
      storageKey: "keydown",
      openName: "✅ 启动解除键盘限制",
      closeName: "❌ 关闭解除键盘限制",
      openFunction: () => window.addEventListener("keydown", stopNativePropagation, true),
      closeFunction: () => window.removeEventListener("keydown", stopNativePropagation, true)
    }
  ];
  (function() {
    register(CONTROLLER_MAP);
  })();

}());
