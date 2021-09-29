import common from "./common.js";

const website = {
    regexp: new RegExp(".+aiyuke.com/news/.+"),
    init: function($) {
        common.hideButton($);
        $(".news_content_body").css("user-select", "auto");
    }
}; 

export default website;