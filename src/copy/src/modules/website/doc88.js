var path = "";

function init() {
    // GM_xmlhttpRequest({
    //     method: "GET",
    //     url: "https://res.doc88.com/assets/js/v2.js",
    //     onload: function(response) {
    //         var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
    //         path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
    //     }
    // })
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://static.doc88.com/resources/js/modules/main-v1.min.js?v=1.29",
        onload: function(response) {
            path = /<textarea[\s\S]+>'\+([\S]*?)\+\"<\/textarea>/.exec(response.responseText)[1];
        }
    })
    
}

function getSelectedText(){
    let select = unsafeWindow;
    path.split(".").forEach(v => {
        select = select[v];
    });
    return select;
}

export default { init, getSelectedText }