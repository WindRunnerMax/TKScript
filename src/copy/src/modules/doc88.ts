import { Website } from "../websites";

let path = "";

const website: Website = {
    regexp: /.*doc88\.com\/.+/,
    init: $ => {
        // GM_xmlhttpRequest({
        //     method: "GET",
        //     url: "https://res.doc88.com/assets/js/v2.js",
        //     onload: function(response) {
        //         var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
        //         path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
        //     }
        // })
        $("body").append(`<style id="copy-hide">#left-menu{display: none !important;}</style>`);
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://res1.doc88.com/resources/js/modules/main-v2.min.js?v=2.90",
            onload: function (response) {
                path = /<textarea[\s\S]+>'\+([\S]*?)\+"<\/textarea>/.exec(response.responseText)[1];
            },
        });
    },
    getSelectedText: (): string => {
        let select = unsafeWindow;
        path.split(".").forEach((v: string) => {
            select = select[v];
        });
        return select;
    },
};

export default website;
