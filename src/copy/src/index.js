import style from "./style.css";
import { initEvent } from "./modules/event.js"
import { initWebsite, getSelectedText } from "./modules/dispose.js"

(function() {
    var $ = window.$;
    var ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text
    initEvent($, ClipboardJS);
    initWebsite($, ClipboardJS);
    document.addEventListener("mouseup", (e) => {
        var copyText = getSelectedText();
        if (copyText) console.log(copyText);
        else return "";
        $("#_copy").remove();
        var template = `
            <div id="_copy"
            style="left:${e.pageX + 30}px;top:${e.pageY}px;"
            data-clipboard-text="${copyText.replace(/"/g, "&quot;")}">复制</div>
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

/**
 * http://wenku.baiduvvv.com/
 * https://www.huiyingwu.com/1718/
 */