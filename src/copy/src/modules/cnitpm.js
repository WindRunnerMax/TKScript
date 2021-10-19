import utils from "../utils";

const website = {
    regexp: /cnitpm/,
    init: function($) {
        utils.hideButton($);
        window.onload = () => {
            const container = $("body");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
        };
    }
}; 

export default website;