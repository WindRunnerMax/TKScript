import { instance } from "../utils/instance";
import type { Website } from "../websites";

const website: Website = {
  regexp: /.*docs\.qq\.com\/slide\/.+/,
  config: {
    initCopyEvent: false,
    captureInstance: true,
    runAt: "document-start",
  },
  init: function () {
    let webpackJsonp = unsafeWindow.webpackJsonp;
    Object.defineProperty(unsafeWindow, "webpackJsonp", {
      get() {
        return webpackJsonp;
      },
      set(newValue) {
        if (newValue.push.__HOOKED__) {
          return;
        }
        webpackJsonp = newValue;
        const originPush = webpackJsonp.push;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function push(...args: any[]) {
          const [, mods] = args[0];
          for (const [key, fn] of Object.entries(mods)) {
            const stringifyFn = String(fn);
            if (/this\.shouldResponseCopy\(/.test(stringifyFn)) {
              const next = stringifyFn.replace(/this\.shouldResponseCopy\(/g, "(() => true)(");
              // .replace(/this.storeManager=/g, "window.storeManager=this.storeManager=")
              mods[key] = new Function(`return (${next})`)();
            }
          }
          // @ts-expect-error this
          return originPush.call(this, ...args);
        }
        push.__HOOKED__ = 1;
        webpackJsonp.push = push;
      },
    });
    window.onload = () => {
      instance.disable();
    };
  },
};

export default website;
