var path = "";

function init() {
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://res.doc88.com/assets/js/v2.js",
        onload: function(response) {
            var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
            path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
        }
    })
}

function getSelectedText(){
    return unsafeWindow.Viewer[path];
}

export default { init, getSelectedText }