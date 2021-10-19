import utils from "../utils";

const website = {
    regexp: new RegExp("17k"),
    init: function($) {
        utils.hideButton($);
        utils.enableOnCopy($, ".readAreaBox .p");
    }
}; 

export default website;