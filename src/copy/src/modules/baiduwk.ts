import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    config: {
        runAt: "document-start",
    },
    regexp: new RegExp("wenku.baidu.com/view/.*"),
    init: function ($) {
        utils.hideButton($);
        utils.enableOnCopyByCapture();
        $("head").append(`<style>@media print { body{ display:block; } }</style>`);
        type TextData = [arg1: string, ...rest: number[]];
        type CanvasDataConstruction = { canvas: Element; data: TextData[] };
        let canvasDataGroup: CanvasDataConstruction[] = [];
        document.createElement = new Proxy(document.createElement, {
            apply: function (target, thisArg, argumentsList) {
                const element = Reflect.apply(target, thisArg, argumentsList);
                if (argumentsList[0] === "canvas") {
                    const tmpData: CanvasDataConstruction = {
                        canvas: element,
                        data: [],
                    };
                    element.getContext("2d").fillText = function (...args: TextData) {
                        tmpData.data.push(args);
                        originObject.context2DPrototype.fillText.apply(this, args);
                    };
                    canvasDataGroup.push(tmpData);
                }
                return element;
            },
        });

        const templateCSS = [
            "<style id='copy-template-css'>",
            "body{overflow: hidden !important}",
            "#copy-template-html{position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center;z-index: 999999; background: rgba(0,0,0,0.5);}",
            "#copy-template-html > .template-container{height: 80%; width: 80%; background: #fff; }",
            ".template-container > .title-container{display: flex; align-items: center; justify-content: space-between;padding: 10px;border-bottom: 1px solid #eee;}",
            "#copy-template-text{height: 100%; width: 100%;position: relative; overflow: auto;background: #fff;}",
            "#copy-template-html #template-close{cursor: pointer;}",
            "</style>",
        ].join("");

        const render = () => {
            canvasDataGroup = canvasDataGroup.filter(item => item.canvas.id);
            const templateText: string[] = canvasDataGroup.map((canvasData, index) => {
                const computedTop = index * Number(canvasData.canvas.clientHeight);
                const textItem: string[] = canvasData.data.map(
                    item =>
                        `<div style="position: absolute; left: ${item[1]}px; top: ${
                            item[2] + computedTop
                        }px">${item[0]}</div>`
                );
                return textItem.join("");
            });
            const templateHTML = [
                "<div id='copy-template-html'>",
                "<div class='template-container'>",
                "<div class='title-container'>",
                "<div>请自行复制</div>",
                "<div id='template-close'>关闭</div>",
                "</div>",
                "<div id='copy-template-text'>",
                templateText.join(""),
                "</div>",
                "</div>",
                "</div>",
            ].join("");
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
            `<style>#copy-btn-wk{padding: 10px; background: rgba(0,0,0,0.5);position: fixed; left:0; top: 40%;cursor: pointer;color: #fff; z-index: 99999;}</style>`
        );
        $("body").append("<div id='copy-btn-wk'>复制</div>");
        $("#copy-btn-wk").on("click", render);

        const originObject = {
            context2DPrototype: unsafeWindow.document.createElement("canvas").getContext("2d")
                .__proto__,
        };
    },
};

export default website;
