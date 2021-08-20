
const website = {
    regexp: /mbalib/,
    init: function($) {
        window.onload = () => {
            const container = $("#fullScreenContainer");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
        };
    }
}; 

export default website;