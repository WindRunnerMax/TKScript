import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(".+bbs.mihoyo.com/.+"),
    init: function () {
        utils.hideButton();
        utils.enableOnCopyByCapture();
        utils.enableOnSelectStartByCapture();
        utils.enableUserSelectByCSS();
    },
};

export default website;
