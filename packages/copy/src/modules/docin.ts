import { PAGE_LOADED } from "../constant/event";
import dom from "../utils/dom";
import type { Website } from "../websites";

const website: Website = {
  regexp: new RegExp("docin.com/.*"),
  config: {
    initCopyEvent: false,
    captureInstance: true,
    delay: 100,
  },
  init: function () {
    window.addEventListener(PAGE_LOADED, () => dom.query("#j_select")?.click());
    dom.append("head", "<style>#reader-copy-el{display: none;}</style>");
  },
  getSelectedText: function () {
    if (unsafeWindow.docinReader && unsafeWindow.docinReader.st) {
      return unsafeWindow.docinReader.st;
    }
    return "";
  },
};

export default website;
