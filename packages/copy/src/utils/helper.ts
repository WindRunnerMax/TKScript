// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// =========================================================================== //

/**
 * Scan Object
 */
const weakSet = new WeakSet();
const pathRouter = ["root"];

const deepScanObject = (origin, deep, maxDeep) => {
  if (deep > maxDeep) return;
  for (const item in origin) {
    try {
      const value = origin[item];
      if (value && typeof value === "object") {
        if (weakSet.has(value)) continue;
        weakSet.add(value);
        pathRouter.push(item);
        deepScanObject(value, deep + 1, maxDeep);
        pathRouter.pop();
      } else {
        const regexp = /以熔体流动速率/;
        if (regexp.test(item) || regexp.test(value)) {
          console.log(pathRouter.join("/") + "/" + item, "================", value);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  }
};

deepScanObject.toString = () => "";
console.log("start");
deepScanObject(window, 0, 10);
console.log("finish");

// =========================================================================== //

/**
 * Read Clipboard
 */
setTimeout(() => {
  navigator.clipboard.read().then(res => {
    for (const item of res) {
      const types = item.types;
      for (const type of types) {
        item.getType(type).then(data => {
          const reader = new FileReader();
          reader.readAsText(data, "utf-8");
          reader.onload = () => {
            console.info(type, reader.result);
          };
        });
      }
    }
  });
}, 2000);

// =========================================================================== //

/**
 * Remove Listeners
 */
const removeAllEventListeners = (element, ancestor = false) => {
  const listeners = getEventListeners(element);
  Object.keys(listeners).forEach(event => {
    listeners[event].forEach(listener => {
      element.removeEventListener(event, listener.listener, {
        capture: listener.useCapture,
        once: listener.once,
        passive: listener.passive,
      });
    });
  });
  ancestor && element === document && window && removeAllEventListeners(window, ancestor);
  ancestor &&
    element &&
    element.parentNode &&
    removeAllEventListeners(element.parentNode, ancestor);
};
removeAllEventListeners($0, true);

const elements = [...document.querySelectorAll("*")];
for (const element of elements) {
  element instanceof HTMLElement && removeAllEventListeners(element);
}

// =========================================================================== //

/**
 * Remove Attributes
 */
const elements = [...document.querySelectorAll("*")];
for (const element of elements) {
  if (element instanceof HTMLElement) {
    const attrs = element.getAttributeNames();
    attrs.forEach(item => element.removeAttribute(item));
  }
}

// =========================================================================== //

/**
 * Hook Function Call
 */
let index = 0;
const log = window.console.log;
(function reset() {
  index = 0;
  setTimeout(reset, 3000);
})();
const native = [Array.prototype.slice, Object.prototype.toString, Object.prototype.hasOwnProperty];
Function.prototype.call = function (dynamic, ...args) {
  if (
    !dynamic ||
    typeof dynamic !== "object" ||
    native.includes(this) ||
    !args.length ||
    dynamic.nodeType
  ) {
    return this.bind(dynamic)(...args);
  }
  index++;
  if (index < 30) {
    log("__dynamic", dynamic);
    log("__args", args);
    log("__this", this);
  }
  return this.bind(dynamic)(...args);
};

// =========================================================================== //

/**
 * Read Clipboard On Paste
 */
const input = document.createElement("input");
input.style.position = "fixed";
input.style.top = "100px";
input.style.right = "10px";
input.style.zIndex = "999999";
input.style.width = "200px";
input.placeholder = "Read Clipboard On Paste";
input.addEventListener("paste", event => {
  const clipboardData = event.clipboardData || window.clipboardData;
  for (const item of clipboardData.items) {
    console.log(`%c${item.type}`, "background-color: #165DFF; color: #fff; padding: 3px 5px;");
    console.log(item.kind === "file" ? item.getAsFile() : clipboardData.getData(item.type));
  }
});
document.body.appendChild(input);

// =========================================================================== //
