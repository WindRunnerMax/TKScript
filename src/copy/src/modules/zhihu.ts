import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*zhihu\.com\/.*/,
    init: function ($) {
        utils.hideButton($);
    },
};

export default website;
