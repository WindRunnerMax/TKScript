import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(["wjx", "fanyi\\.baidu", "tianqi", "rrdynb", "fuwu7"].join("|")),
    init: function () {
        utils.hideButton();
        utils.enableUserSelectByCSS();
        utils.enableOnCopyByCapture();
        utils.enableOnKeyDownByCapture();
        utils.enableOnSelectStartByCapture();
        utils.enableOnContextMenuByCapture();
    },
};

export default website;
