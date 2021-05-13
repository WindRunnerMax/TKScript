import common from "./common.js";

const website = {
    regexp: new RegExp(".+www.uemeds.cn/.+"),
    init: function($) {
        common.hideButton($);
        const template = `
            <style>
                .detail-main{
                    user-select: auto;
                    -webkit-user-select: auto;
                }
            </style>
        `;
        $("body").append(template.replace(/\s*/, " "));
    }
} 

export default website;