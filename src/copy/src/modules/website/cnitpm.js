import common from "./common.js";

const website = {
    regexp: /cnitpm/,
    init: function($) {
        common.hideButton($);
        window.onload = () => {
            const container = $("body");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
        };
    }
}; 

export default website;