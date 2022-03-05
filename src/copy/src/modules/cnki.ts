import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("cnki"),
    init: function ($) {
        utils.hideButton($);
        utils.enableOnContextMenuByCapture();
        utils.enableOnKeyDownByCapture();
        utils.enableOnCopyByCapture();
    },
};

export default website;
