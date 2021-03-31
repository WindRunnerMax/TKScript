
const website = {
    regexp: /mbalib/,
    init: function($) {
        window.onload = () => {
            let container = $("#fullScreenContainer");
            container.attr("oncopy", "");
            container.attr("oncontextmenu", "");
            container.attr("onselectstart", "");
        }
    }
} 

export default website;