import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("qidian"),
    init: function ($) {
        utils.hideButton($);
        utils.enableUserSelect($, "body");
        utils.enableOnCopy($, ".main-read-container");
        utils.enableOnContextMenu($, ".main-read-container");
    },
};

export default website;
