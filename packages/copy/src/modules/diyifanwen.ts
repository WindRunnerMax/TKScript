import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /diyifanwen/,
    init: function () {
        utils.hideButton();
        utils.enableOnCopyByCapture();
        utils.enableOnKeyDownByCapture();
    },
};

export default website;
