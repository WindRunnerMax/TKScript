import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp("wenku.baidu.com/view/.*"),
    init: function ($) {
        utils.enableOnKeyDownByCapture();
        $("head").append(`<style>@media print { body{ display:block; } }</style>`);
    },
    getSelectedText: (): string => {
        if (window.getSelection && window.getSelection().toString()) {
            return window.getSelection().toString();
        }
        const result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
        if (result) return result[1];
        return "";
    },
};

export default website;

// `tips`
// /static/ndpcwenku/static/ndview/js/common/components.{hash}.js selectedTextTrim
// button: search translate

/*
var weakSet = new WeakSet();
var pathRouter = ["root"];

var deepScanObject = (origin, deep, maxDeep) => {
    if(deep > maxDeep) return ;
    for(let item in origin) {
        try{
            const value = origin[item];
            if(value && typeof(value) === "object") {
                if(weakSet.has(value)) continue;
                weakSet.add(value);
                pathRouter.push(item);
                deepScanObject(value, deep + 1, maxDeep);
                pathRouter.pop();
            }else{
                const regexp = /以熔体流动速率/;
                if(regexp.test(item) || regexp.test(value)){
                    console.log(
                        pathRouter.join("/") + "/" + item, 
                        "================", 
                        value
                    )
                }
            }   
        }catch(e){
            console.warn(e)
        }

    }
}

deepScanObject.toString = () => "";

console.log("start");

deepScanObject(window, 0, 10)
// deepScanObject({a : 1, b: { c : 1 } }, 0, 2)

console.log("finish");
*/
