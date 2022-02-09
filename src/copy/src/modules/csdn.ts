import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /csdn/,
    init: function ($) {
        utils.hideButton($);
        utils.enableOnCopyByCapture();
        utils.enableUserSelect($, "*");
    },
};

export default website;
