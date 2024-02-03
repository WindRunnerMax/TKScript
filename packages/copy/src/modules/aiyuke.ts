import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: new RegExp(".+aiyuke.com/news/.+"),
  init: function () {
    utils.hideButton();
    utils.enableUserSelectByCSS();
  },
};

export default website;
