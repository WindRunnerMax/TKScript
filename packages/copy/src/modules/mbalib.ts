import { Website } from "../websites";

const website: Website = {
    regexp: /mbalib/,
    init: function ($) {
        window.onload = () => {
            const container = $("#fullScreenContainer");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
        };
    },
};

export default website;
