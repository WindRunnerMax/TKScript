import utils from "../utils";

const website = {
    regexp: /.*zhihu\.com\/.*/,
    init: function($) {
        utils.hideButton($);
    }
}; 

export default website;