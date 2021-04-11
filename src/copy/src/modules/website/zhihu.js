import common from "./common.js";

const website = {
    regexp: /.*zhihu\.com\/.*/,
    init: function($) {
        common.hideButton($);
    }
} 

export default website;