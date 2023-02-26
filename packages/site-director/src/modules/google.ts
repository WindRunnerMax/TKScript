import { Website } from "../websites";

const website: Website = {
    regexp: /google/,
    init: function () {
        const isScholar = window.location.host.startsWith("scholar");

        document.addEventListener("DOMContentLoaded", () =>
            document
                .querySelectorAll(isScholar ? "#gs_bdy_ccl a" : "#res a")
                .forEach(item => item.setAttribute("target", "_blank"))
        );
    },
};

export default website;
