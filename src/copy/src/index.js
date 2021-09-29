import "./style.css";
import { initEvent } from "./event.js";
import { initWebsite, getSelectedText } from "./dispose.js";

(function() {
    const $ = window.$;
    const ClipboardJS = window.ClipboardJS; // https://clipboardjs.com/#example-text
    initEvent($, ClipboardJS);
    initWebsite($, ClipboardJS);
    document.addEventListener("mouseup", (e) => {
        const copyText = getSelectedText();
        if (copyText) console.log(copyText);
        else return "";
        $("#_copy").remove();
        const template = `
            <div id="_copy"
            style="left:${e.pageX + 30}px;top:${e.pageY}px;"
            data-clipboard-text="${copyText.replace(/"/g, "&quot;")}">复制</div>
        `;
        $("body").append(template);
        $("#_copy").on("mousedown", (event) => {
            event.stopPropagation();
        });
        $("#_copy").on("mouseup", (event) => {
            event.stopPropagation();
        });
        new ClipboardJS('#_copy');
    });
 
})();

/**
 * http://wenku.baiduvvv.com/
 * https://www.huiyingwu.com/1718/
 */