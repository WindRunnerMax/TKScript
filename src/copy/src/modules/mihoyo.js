import utils from "../utils";

const website = {
    regexp: new RegExp(".+bbs.mihoyo.com/ys/obc.+"),
    init: function($) {
        utils.hideButton($);
        $(".detail__content").on("copy", e => e.stopPropagation());
        const template = `
            <style>
                body{
                    user-select: auto;
                    -webkit-user-select: auto;
                }
            </style>
        `;
        $("body").append(template.replace(/\s*/, " "));
    }
}; 

export default website;