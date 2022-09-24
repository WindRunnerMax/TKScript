import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("leetcode"),
    init: function () {
        utils.hideButton();
        utils.enableOnCopy("#lc-home");
    },
};

export default website;
