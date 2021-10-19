import utils from "../utils";

const website = {
    regexp: new RegExp("zongheng"),
    init: function($) {
        utils.removeAttributes($, ".reader_box", ["style", "unselectable", "onselectstart"]);
        utils.hideButton($);
        utils.enableOnKeyDown($, "body");
        utils.enableUserSelect($, ".reader_box .content p");
        utils.enableOnCopy($, ".content");
        utils.enableOnContextMenu($, "body");
        utils.enableOnSelectStart($, ".content");
    }
}; 

export default website;