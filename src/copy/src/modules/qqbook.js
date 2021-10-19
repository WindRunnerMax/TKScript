import utils from "../utils";

const website = {
    regexp: new RegExp("book\\.qq"),
    init: function($) {
        utils.hideButton($);
        utils.enableUserSelect($, "body");
        utils.enableOnCopy($, "body");
        utils.enableOnContextMenu($, "body");
        utils.enableOnSelectStart($, "body");
    }
}; 

export default website;