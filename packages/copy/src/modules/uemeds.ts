import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(".+www.uemeds.cn/.+"),
    init: function () {
        utils.hideButton();
        utils.enableUserSelectByCSS();
    },
};

export default website;
