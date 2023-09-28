import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
  regexp: new RegExp("ciweimao"),
  init: function () {
    utils.hideButton();
    utils.enableUserSelectByCSS();
    utils.enableOnCopy("#J_BookCnt");
    utils.enableOnContextMenu("body");
    utils.enableOnSelectStart("#J_BookCnt");
  },
};

export default website;
