import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("bilibili"),
    init: function () {
        utils.hideButton();
        utils.enableOnCopyByCapture();
    },
};

export default website;
