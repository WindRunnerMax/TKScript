import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: new RegExp("utaten"),
  init: function () {
    utils.hideButton();
    utils.enableUserSelectByCSS();
    utils.enableOnSelectStartByCapture();
  },
};

export default website;
