import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(".+aiyuke.com/news/.+"),
    init: function ($) {
        utils.hideButton($);
        $(".news_content_body").css("user-select", "auto");
    },
};

export default website;
