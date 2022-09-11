import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("xiaohongshu"),
    init: function ($) {
        utils.hideButton($);
        utils.enableUserSelect($, "*");
        utils.enableOnKeyDownByCapture();
    },
};

export default website;
