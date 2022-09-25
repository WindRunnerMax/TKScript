import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*zhihu\.com\/.*/,
    init: function () {
        utils.hideButton();
        utils.enableUserSelectByCSS();
        utils.enableOnCopyByCapture();
    },
};

export default website;
