import { Website } from "../websites";

const website: Website = {
    regexp: /google/,
    init: function ($) {
        $("#res a").attr("target", "_blank");
    },
};

export default website;
