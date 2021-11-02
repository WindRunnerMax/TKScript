import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("zongheng"),
    init: function ($) {
        utils.removeAttributes($, ".reader_box", ["style", "unselectable", "onselectstart"]);
        utils.hideButton($);
        utils.enableOnKeyDown($, "body");
        utils.enableUserSelect($, ".reader_box .content p");
        utils.enableOnCopy($, ".content");
        utils.enableOnContextMenu($, "body");
        utils.enableOnSelectStart($, ".content");
    },
};

export default website;
