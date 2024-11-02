import { PAGE_LOADED } from "../constant/event";
import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: new RegExp("leetcode"),
  init: function () {
    utils.hideButton();
    window.addEventListener(PAGE_LOADED, () => {
      utils.enableOnCopy("#lc-home");
      utils.enableOnCopy("[data-layout-path='/ts0/t1']");
    });
  },
};

export default website;
