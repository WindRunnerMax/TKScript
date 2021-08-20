
const website = {
    regexp: /.*30edu\.com\.cn\/.+/,
    init: function($) {
        window.onload = () => {
            const iframes = document.getElementsByTagName("iframe");
            if(iframes.length === 2){
                console.log(iframes[1].contentWindow.document);
                const body = $(iframes[1].contentWindow.document.querySelector("body"));
                body.attr("oncopy", "");
                body.attr("oncontextmenu", "");
                body.attr("onselectstart", "");
            }
        };
    }
}; 

export default website;