import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: new RegExp("leetcode"),
  init: function () {
    utils.hideButton();
    utils.enableOnCopy("#lc-home");
  },
};

export default website;
