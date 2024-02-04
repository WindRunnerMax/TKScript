import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: /csdn/,
  init: function () {
    utils.hideButton();
    utils.enableOnCopyByCapture();
    utils.enableUserSelectByCSS();
  },
};

export default website;
