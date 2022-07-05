import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("utaten"),
    init: function ($) {
        utils.hideButton($);
        utils.enableUserSelect($, "*");
        utils.enableOnSelectStartByCapture();
    },
};

export default website;
