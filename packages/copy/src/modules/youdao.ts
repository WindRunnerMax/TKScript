import { MOUSE_DOWN, MOUSE_MOVE } from "../constant/event";
import utils, { stopNativePropagation } from "../utils/event";
import { Website } from "../websites";

const website: Website = {
  regexp: /note\.youdao\.com\/newEditorV1\/bulb\.html.*/,
  init: function () {
    utils.hideButton();
    utils.enableUserSelectByCSS();
    document.addEventListener(MOUSE_DOWN, stopNativePropagation, true);
    document.addEventListener(MOUSE_MOVE, stopNativePropagation, true);
  },
};

export default website;
