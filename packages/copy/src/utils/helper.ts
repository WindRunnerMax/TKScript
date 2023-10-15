// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// Scan Object
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
// deepScanObject({a : 1, b: { c : 1 } }, 0, 2)

console.log("finish");

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

/**
 * Remove Listeners
 */
function removeAllEventListeners(element, ancestor = false) {
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
}
removeAllEventListeners($0, true);

const elements = [...document.querySelectorAll("*")];
for (const element of elements) {
  element instanceof HTMLElement && removeAllEventListeners(element);
}

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

/**
 * Hook Function Call
 */
Function.prototype.call = function (dynamic, ...args) {
  const context = Object(dynamic) || window;
  const symbol = Symbol();
  context[symbol] = this;
  args.length === 2 && console.log(args);
  try {
    const result = context[symbol](...args);
    delete context[symbol];
    return result;
  } catch (error) {
    console.log("Hook Call Error", error);
    console.log(context, context[symbol], this, dynamic, args);
    return null;
  }
};
