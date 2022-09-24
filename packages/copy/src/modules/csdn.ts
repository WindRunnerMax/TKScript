import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /csdn/,
    init: function () {
        utils.hideButton();
        utils.enableOnCopyByCapture();
        utils.enableUserSelectByCSS();
    },
};

export default website;
