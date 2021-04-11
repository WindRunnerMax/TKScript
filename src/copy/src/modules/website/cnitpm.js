import common from "./common.js";

const website = {
    regexp: /cnitpm/,
    init: function($) {
        common.hideButton($);
        window.onload = () => {
            let container = $("body");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
        }
    }
} 

export default website;