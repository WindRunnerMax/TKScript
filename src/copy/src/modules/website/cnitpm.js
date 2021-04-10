
const website = {
    regexp: /cnitpm/,
    init: function($) {
        window.onload = () => {
            let container = $("body");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
            $("body").append(`<style id="copy-hide" >#_copy{display: none !important;}</style>`);
        }
    }
} 

export default website;