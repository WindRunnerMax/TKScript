function init($) {
    window.onload = () => {
        var iframes = document.getElementsByTagName("iframe");
        if(iframes.length === 2){
            console.log(iframes[1].contentWindow.document)
            let body = $(iframes[1].contentWindow.document.querySelector("body"));
            console.log(body)
            body.attr("oncopy", "");
            body.attr("oncontextmenu", "");
            body.attr("onselectstart", "");
        }
    }
}

export default { init }