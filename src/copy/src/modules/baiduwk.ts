import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("wenku.baidu.com/view/.*"),
    init: function ($) {
        utils.enableOnKeyDownByCapture();
        $("head").append(`<style>@media print { body{ display:block; } }</style>`);
    },
};

export default website;
