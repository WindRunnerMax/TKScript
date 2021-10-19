import utils from "../utils";

const website = {
    regexp: new RegExp(".+www.uemeds.cn/.+"),
    init: function($) {
        utils.hideButton($);
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
}; 

export default website;