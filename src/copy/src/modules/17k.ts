import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("17k"),
    init: $ => {
        utils.hideButton($);
        utils.enableOnCopy($, ".readAreaBox .p");
    },
};

export default website;
