import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(".+://boke112.com/post/.+"),
    init: function ($) {
        $("body").on("click", () => false);
        const template = `
            <style>
                :not(input):not(textarea)::selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }

                :not(input):not(textarea)::-moz-selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }
            </style>
        `;
        $("body").append(template.replace(/\s*/, " "));
    },
};

export default website;
