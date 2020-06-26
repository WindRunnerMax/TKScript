// ==UserScript==
// @name         文本选中复制
// @namespace    https://github.com/WindrunnerMax/TKScript
// @version      1.3
// @description  文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 无忧考网 学习啦 蓬勃范文
// @author       Czy
// @include      *://wenku.baidu.com/view/*
// @include      *://www.51test.net/show/*
// @include      *://www.xuexi.la/*
// @include      *://www.xuexila.com/*
// @include      *://www.cspengbo.com/*
// @include      *://www.doc88.com/*
// @license      GPL License
// @grant        unsafeWindow
// @grant        GM_xmlhttpRequest
// @require      https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @connect      res.doc88.com
// ==/UserScript==

(function() {
    "use strict";
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text

    function getSelectedText() {
        if(window.location.host.match(".*doc88.*")) return unsafeWindow.Viewer[window.path];
        if(window.getSelection) return window.getSelection().toString();
        else if(document.getSelection) return document.getSelection();
        else if(document.selection) return document.selection.createRange().text;
    }

    (function(){
        document.addEventListener("mouseup", (e) => {
            var copyText = getSelectedText();
            if(copyText) console.log(copyText)
            else return "";
            $("#_copy").remove();
            var template = `
                <div id="_copy"
                style="left:${e.pageX + 30}px;top:${e.pageY}px;"
                data-clipboard-text="${copyText}">复制</div>
            `;

            $("body").append(template);
            $("#_copy").on("mousedown", (event) => {
                 event.stopPropagation();
             })
            $("#_copy").on("mouseup", (event) => {
                 event.stopPropagation();
             })
            new ClipboardJS('#_copy');
        });
    })();

    (function(){
         var template = `
            <style type="text/css">
                #_copy{
                    width:60px;
                    height:30px;
                    background:#4C98F7;
                    color:#fff;
                    position:absolute;
                    z-index:1000;
                    display:flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 3px;
                    font-size: 13px;
                    cursor: pointer;
               }
               div[id^=reader-helper]{
                    display: none !important;
               }
            </style>
         `;
        $("head").prepend(template);
        ClipboardJS.prototype.on('success', function(e) {
            $("#_copy").html("复制成功");
            setTimeout(() => $("#_copy").fadeOut(1000), 1000);
            e.clearSelection();
        });
        ClipboardJS.prototype.on('error', function(e) {
            $("#_copy").html("复制失败");
            setTimeout(() => $("#_copy").fadeOut(1000), 1000);
            e.clearSelection();
        });
        $("body").on("mousedown", (e) => {
            $("#_copy").remove();
        })
        document.oncopy = () => {}
        $("body").on("copy", (e) => {
            e.stopPropagation();
            return true;
        })
        if(window.location.host.match(".*doc88.*")){
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://res.doc88.com/assets/js/v2.js",
                onload: function(response) {
                    var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
                    window.path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
                }
            })
        }
    })();
})();

/**
 * https://www.wenku.zone/
 * http://wenku.baiduvvv.com/
 * https://www.huiyingwu.com/1718/
 */
