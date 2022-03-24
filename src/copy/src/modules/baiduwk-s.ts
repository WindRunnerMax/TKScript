// `tips`
// /static/ndpcwenku/static/ndview/js/common/components.{hash}.js selectedTextTrim
// button: search translate

// `window.webpackJson Hook` `document-start` `grant connect`
/*
unsafeWindow.webpackJsonp = [];
const hookedPush = function(...args){
    console.log(args);
}
unsafeWindow.webpackJsonp.push = hookedPush;
Object.defineProperty(unsafeWindow.webpackJsonp, "push", {
    get: function () {
        return hookedPush;
    },
    set: function (_) {
        return hookedPush;
    },
});
setTimeout(() => {
    unsafeWindow.webpackJsonp = [];
    window.$.getScript("https://wkstatic.bdimg.com/static/ndpcwenku/static/ndview/js/views/creader.7eb11c074c703be69e06.js", () => {
        window.$.getScript("https://wkstatic.bdimg.com/static/ndpcwenku/static/ndview/js/common/common.a1efaf8d33ff1572ad92.js", () => {
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://wkstatic.bdimg.com/static/ndpcwenku/static/ndview/js/common/components.dea3c4d6a0375ab9beb1.js",
                onload: function (response) {
                    const code = response.responseText.replace("watch:{selectedTextTrim:function(t){", "watch:{selectedTextTrim:function(t){window.selectedTextTrim=t;")
                    new Function(code)();
                },
            });
        });
    });
},3000)
*/

// backdoor
/*
    https://wenku.baidu.com/view/a983bf4177eeaeaad1f34693daef5ef7bb0d1241
    https://wenku.baidu.com/share/a983bf4177eeaeaad1f34693daef5ef7bb0d1241
    https://wenku.baidu.com/share/a983bf4177eeaeaad1f34693daef5ef7bb0d1241?share_api=1&width=800
*/
