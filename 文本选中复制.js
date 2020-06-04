// ==UserScript==
// @name         文本选中复制
// @version      1.0
// @description  文本选中复制
// @author       Czy
// @include      https://wenku.baidu.com/view/*
// @require      https://cdn.bootcss.com/jquery/2.1.2/jquery.min.js
// @require      https://cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js
// @github       https://github.com/WindrunnerMax/TKScript
// ==/UserScript==

(function() {
    "use strict";
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text

    function getSelectedText() {
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
            </style>
         `;
        $("head").prepend(template);
        ClipboardJS.prototype.on('success', function() {
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
    })();

})();

/**
 * 文库下载
 * https://www.wenku.zone/
 * http://wenku.baiduvvv.com/
 */