import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(".+bbs.mihoyo.com/.+"),
    init: function ($) {
        utils.hideButton($);
        utils.enableOnCopyByCapture();
        utils.enableOnSelectStartByCapture();
        utils.enableUserSelect($, "*");
    },
};

export default website;
