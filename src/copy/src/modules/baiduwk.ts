import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("wenku.baidu.com/view/.*"),
    init: function ($) {
        utils.enableOnKeyDownByCapture();
        $("head").append(`<style>@media print { body{ display:block; } }</style>`);
    },
    getSelectedText: (): string => {
        if (window.getSelection && window.getSelection().toString()) {
            return window.getSelection().toString();
        }
        const result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
        if (result) return result[1];
        return "";
    },
};

export default website;
