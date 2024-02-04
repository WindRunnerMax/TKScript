import { DOM_STAGE } from "../constant/event";
import type { Website } from "../websites";

export const kdoc: Website = {
  config: {
    runAt: DOM_STAGE.START,
  },
  regexp: new RegExp("kdocs"),
  init: function () {
    const patch = () => {
      unsafeWindow.APP && (unsafeWindow.APP.canCopy = () => true);
    };
    if (unsafeWindow.APP) {
      patch();
    } else {
      let APP: unknown = undefined;
      Object.defineProperty(unsafeWindow, "APP", {
        configurable: false,
        set: (value: unknown) => {
          APP = value;
          value && patch();
        },
        get: () => APP,
      });
    }
  },
};
