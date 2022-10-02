import { Website } from "../websites";

const website: Website = {
    regexp: /google/,
    init: function () {
        document.addEventListener("DOMContentLoaded", () =>
            document
                .querySelectorAll("#res a")
                .forEach(item => item.setAttribute("target", "_blank"))
        );
    },
};

export default website;
