import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("utaten"),
    init: function ($) {
        utils.removeAttributes($, "body", ["oncontextmenu", "onselectstart"]);
        utils.hideButton($);
        utils.enableUserSelect($, ".lyricBody", true);
    },
};

export default website;
