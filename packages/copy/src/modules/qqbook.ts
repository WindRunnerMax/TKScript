import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
  regexp: new RegExp("book\\.qq"),
  init: function () {
    utils.hideButton();
    utils.enableOnCopy("body");
    utils.enableUserSelectByCSS();
    utils.enableOnContextMenu("body");
    utils.enableOnSelectStart("body");
  },
};

export default website;
