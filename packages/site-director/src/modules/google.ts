import { Website } from "../websites";

const website: Website = {
    regexp: /google/,
    init: function ($) {
        document.addEventListener("DOMContentLoaded", () => $("#res a").attr("target", "_blank"));
    },
};

export default website;
