import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("wenku.baidu.com/.*"),
    init: function ($) {
        $("head").append(`<style>@media print { body{ display:block; } }</style>`);
        const url = location.href;
        if (/view/.test(url)) {
            const templateHTML = [
                "<div id='copy-template-html'>",
                "<div class='template-container'>",
                "<div class='title-container'>",
                "<div>请自行复制</div>",
                "<div id='template-close'>关闭</div>",
                "</div>",
                "<iframe id='copy-template-iframe' src=" +
                    url.replace("view", "share") +
                    "?share_api=1&width=800" +
                    "></iframe>",
                "</div>",
                "</div>",
            ].join("");
            const templateCSS = [
                "<style id='copy-template-css'>",
                "body{overflow: hidden !important}",
                "#copy-template-html{position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center;z-index: 999999;}",
                "#copy-template-html > .template-container{height: 80%; width: 80%;border: 1px solid #eee;background: #fff;}",
                ".template-container > .title-container{display: flex; align-items: center; justify-content: space-between;padding: 10px;border-bottom: 1px solid #eee;}",
                "#copy-template-iframe{height: 100%; width: 100%;border: none;}",
                "#copy-template-html #template-close{cursor: pointer;}",
                "</style>",
            ].join("");

            const show = () => {
                $("body").append(templateHTML);
                $("body").append(templateCSS);
                const closeButton = document.querySelector("#copy-template-html #template-close");
                const close = () => {
                    $("#copy-template-html").remove();
                    $("#copy-template-css").remove();
                    closeButton.removeEventListener("click", close);
                };
                closeButton.addEventListener("click", close);
            };
            $("head").append(
                `<style>#copy-btn-wk{padding: 10px; background: rgba(0,0,0,0.5);position: fixed; left:0; top: 40%;cursor: pointer;color: #fff;}</style>`
            );
            $("body").append("<div id='copy-btn-wk'>复制</div>");
            $("#copy-btn-wk").on("click", show);
        } else if (/share/.test(url)) {
            utils.enableOnKeyDownByCapture();
            $("head").append(
                "<style>.shadow-bg{position: absolute !important; left: unset !important; bottom: unset !important;}</style>"
            ); // 兼容
        }
    },
};

export default website;
