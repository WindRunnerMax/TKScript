import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("book\\.qq"),
    init: function ($) {
        utils.hideButton($);
        utils.enableUserSelect($, "body");
        utils.enableOnCopy($, "body");
        utils.enableOnContextMenu($, "body");
        utils.enableOnSelectStart($, "body");
    },
};

export default website;
