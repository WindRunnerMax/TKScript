import { PAGE_LOADED } from "../constant/event";
import type { Website } from "../websites";

export const kdoc: Website = {
  regexp: new RegExp("kdocs"),
  init: function () {
    window.addEventListener(PAGE_LOADED, () => {
      // @ts-expect-error window.APP
      window.APP && (window.APP.canCopy = () => true);
    });
  },
};
