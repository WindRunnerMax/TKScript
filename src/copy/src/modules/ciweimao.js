import utils from "../utils";

const website = {
    regexp: new RegExp("ciweimao"),
    init: function($) {
        utils.hideButton($);
        utils.enableUserSelect($, "#J_BookRead");
        utils.enableOnCopy($, "#J_BookCnt");
        utils.enableOnContextMenu($, "body");
        utils.enableOnSelectStart($, "#J_BookCnt");
    }
}; 

export default website;