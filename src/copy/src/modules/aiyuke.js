import utils from "../utils";

const website = {
    regexp: new RegExp(".+aiyuke.com/news/.+"),
    init: function($) {
        utils.hideButton($);
        $(".news_content_body").css("user-select", "auto");
    }
}; 

export default website;