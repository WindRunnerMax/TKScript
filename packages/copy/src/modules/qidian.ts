import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("qidian"),
    init: function () {
        utils.hideButton();
        utils.enableUserSelectByCSS();
        utils.enableOnCopy(".main-read-container");
        utils.enableOnContextMenu(".main-read-container");
    },
};

export default website;
