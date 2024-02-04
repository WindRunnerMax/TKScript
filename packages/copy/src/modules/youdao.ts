import { MOUSE_DOWN, MOUSE_MOVE } from "../constant/event";
import utils, { stopNativePropagation } from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  config: {
    initCopyEvent: false,
  },
  regexp: /note\.youdao\.com\/newEditorV1\/bulb\.html.*/,
  init: function () {
    utils.hideButton();
    if (window.parent && window.parent.location.href.indexOf("ynoteshare") > -1) {
      utils.enableUserSelectByCSS();
      document.addEventListener(MOUSE_DOWN, stopNativePropagation, true);
      document.addEventListener(MOUSE_MOVE, stopNativePropagation, true);
    }
  },
};

export default website;
