// ==UserScript==
// @name        🔥🔥🔥文本选中复制🔥🔥🔥
// @description 解除网站不允许复制的限制，文本选中后点击复制按钮即可复制，主要用于 百度文库 道客巴巴 腾讯文档 豆丁网 无忧考网 学习啦 蓬勃范文 思否社区 力扣 知乎 语雀 等
// @namespace   https://github.com/WindrunnerMax/TKScript
// @version     6.1.0
// @author      Czy
// @match       *://wenku.baidu.com/view/*
// @match       *://wenku.baidu.com/share/*
// @match       *://wenku.baidu.com/link*
// @match       *://wenku.baidu.com/ndPureView/*
// @match       *://www.51test.net/show/*
// @match       *://www.xuexi.la/*
// @match       *://www.xuexila.com/*
// @match       *://www.cspengbo.com/*
// @match       *://*.doc88.com/*
// @match       *://segmentfault.com/*
// @match       *://wk.baidu.com/view/*
// @match       *://leetcode-cn.com/problems/*
// @match       *://www.zhihu.com/*
// @match       *://z.30edu.com.cn/*
// @match       *://docs.qq.com/doc/*
// @match       *://boke112.com/post/*
// @match       *://www.yuque.com/*
// @match       *://www.commandlinux.com/*
// @match       *://*.diyifanwen.com/*
// @match       *://*.mbalib.com/*
// @match       *://*.cnitpm.com/*
// @match       *://bbs.mihoyo.com/ys/*
// @match       *://*.ruiwen.com/*
// @match       *://www.uemeds.cn/*
// @match       *://www.oh100.com/*
// @match       *://www.aiyuke.com/news/*
// @match       *://www.fwsir.com/*
// @match       *://www.wenxm.cn/*
// @match       *://www.unjs.com/*
// @match       *://www.ahsrst.cn/*
// @match       *://*.yjbys.com/*
// @match       *://*.qidian.com/*
// @match       *://*.zongheng.com/*
// @match       *://*.17k.com/*
// @match       *://*.ciweimao.com/*
// @match       *://book.qq.com/*
// @match       *://*.360doc.com/content/*
// @match       *://*.850500.com/news/*
// @match       *://utaten.com/lyric/*
// @match       *://*.jianbiaoku.com/*
// @match       *://*.kt250.com/*
// @match       *://www.kejudati.com/*
// @match       *://*.xiaohongshu.com/discovery/*
// @match       *://*.baibeike.com/*
// @match       *://*.blog.csdn.net/*
// @match       *://*.bilibili.com/read/*
// @match       *://*.cnki.net/KXReader/*
// @match       *://*.cnrencai.com/*
// @match       *://*.kodiplayer.cn/*
// @match       *://tongxiehui.net/*
// @match       *://*.jianshu.com/p/*
// @match       *://*.linovelib.com/novel/*
// @match       *://*.wjx.cn/*
// @match       *://*.wjx.top/*
// @match       *://*.chazidian.com/*
// @match       *://*.juejin.cn/post/*
// @match       *://*.zgbk.com/ecph/*
// @match       *://*.wenmi.com/article/*
// @match       *://yuedu.baidu.com/*
// @match       *://www.inrrp.com.cn/*
// @match       *://fanyi.baidu.com/mtpe/*
// @match       *://www.shubaoc.com/*
// @match       *://blog.51cto.com/*
// @match       *://www.ximalaya.com/*
// @match       *://*.tianqi.com/*
// @match       *://*.xiexiebang.com/*
// @match       *://*.docin.com/*
// @supportURL  https://github.com/WindrunnerMax/TKScript/issues
// @license     GPL License
// @installURL  https://github.com/WindrunnerMax/TKScript
// @run-at      document-start
// @connect     res3.doc88.com
// @grant       unsafeWindow
// @grant       GM_xmlhttpRequest
// ==/UserScript==
(function () {
    'use strict';

    var css_248z$1 = ".__copy-button{align-items:center;background:#4c98f7;border-radius:3px;color:#fff;cursor:pointer;display:flex;font-size:13px;height:30px;justify-content:center;opacity:0;position:absolute;transition:opacity .3s;width:60px;z-index:-1000}";

    var css_248z = "#select-tooltip,#sfModal,.modal-backdrop,div[id^=reader-helper]{display:none!important}.modal-open{overflow:auto!important}._sf_adjust_body{padding-right:0!important}";

    var DOM_STAGE = {
        START: "document-start",
        END: "document-end",
    };
    var DOM_READY = "DOMContentLoaded";
    var PAGE_LOADED = "load";
    var COPY = "copy";
    var SELECT_START = "selectstart";
    var CONTEXT_MENU = "contextmenu";
    var KEY_DOWN = "keydown";

    var opt = Object.prototype.toString;
    function isString(value) {
        return opt.call(value) === "[object String]";
    }

    var dom$1 = {
        query: function (selector) {
            return document.querySelector(selector);
        },
        attr: function (selector, attr, value) {
            var dom = document.querySelector(selector);
            dom && dom.setAttribute(attr, value);
        },
        append: function (selector, content) {
            var container = document.createElement("div");
            if (isString(content)) {
                container.innerHTML = content;
            }
            else {
                container.appendChild(content);
            }
            var targetDOM = document.querySelector(selector);
            targetDOM && targetDOM.append(container);
            return container;
        },
        remove: function (selector) {
            var targetDOM = document.querySelector(selector);
            targetDOM && targetDOM.remove();
        },
    };

    var initBaseEvent = function (websiteConfig) {
        document.addEventListener(DOM_READY, function () {
            if (websiteConfig.initCopyEvent) {
                document.oncopy = function (e) { return e.stopPropagation(); };
                document.body.oncopy = function (e) { return e.stopPropagation(); };
                document.addEventListener(COPY, function (e) { return e.stopPropagation(); });
                document.body.addEventListener(COPY, function (e) { return e.stopPropagation(); });
            }
        });
    };
    var initBaseStyle = function () {
        document.addEventListener(DOM_READY, function () {
            dom$1.append("head", "<style>".concat(css_248z$1, "</style>"));
            dom$1.append("head", "<style>".concat(css_248z, "</style>"));
        });
    };

    /**
     * 外部引用`static.doc88.com`声明
     * 此部分是在处理`doc88.com`才会加载的资源文件，此资源文件由该网站加载时提供
     */
    var path = "";
    var website$r = {
        regexp: /.*doc88\.com\/.+/,
        init: function () {
            // GM_xmlhttpRequest({
            //     method: "GET",
            //     url: "https://res.doc88.com/assets/js/v2.js",
            //     onload: function(response) {
            //         var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
            //         path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
            //     }
            // })
            dom$1.append("body", "<style id=\"copy-element-hide\">#left-menu{display: none !important;}</style>");
            GM_xmlhttpRequest({
                method: "GET",
                url: "https://res3.doc88.com/resources/js/modules/main-v2.min.js?v=2.56",
                onload: function (response) {
                    var result = /\("#cp_textarea"\).val\(([\S]*?)\);/.exec(response.responseText);
                    if (result)
                        path = result[1];
                },
            });
            window.addEventListener("load", function () {
                var cpFn = unsafeWindow.copyText.toString();
                var fnResult = /<textarea[\s\S]*?>'\+([\S]*?)\+"<\/textarea>/.exec(cpFn);
                if (fnResult)
                    path = fnResult[1];
            });
        },
        getSelectedText: function () {
            var select = unsafeWindow;
            path.split(".").forEach(function (v) {
                select = select[v];
            });
            if (!select) {
                unsafeWindow.Config.vip = 1;
                unsafeWindow.Config.logined = 1;
                dom$1.remove("#copy-element-hide");
            }
            return select;
        },
    };

    var website$q = {
        regexp: /.*segmentfault\.com\/.+/,
        init: function () {
            var body = dom$1.query("body");
            body.classList.add("_sf_adjust_body");
            body.onclick = function () {
                body.style.paddingRight = "0";
            };
        },
    };

    var TEXT_PLAIN = "text/plain";
    var TEXT_HTML = "text/html";
    var downgradeCopy = function (text) {
        var textarea = document.createElement("textarea");
        textarea.style.position = "fixed";
        textarea.style.left = "-999px";
        textarea.style.top = "-999px";
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
    };
    var isEmptyContent = function (data) {
        return isString(data) ? !data : !data[TEXT_PLAIN];
    };
    var copy = function (data) {
        var _a;
        var params = isString(data) ? (_a = {}, _a[TEXT_PLAIN] = data, _a) : data;
        var plainText = params[TEXT_PLAIN];
        if (!plainText)
            return false;
        if (navigator.clipboard) {
            var dataItems = {};
            for (var _i = 0, _b = Object.entries(params); _i < _b.length; _i++) {
                var _c = _b[_i], key = _c[0], value = _c[1];
                var blob = new Blob([value], { type: key });
                dataItems[key] = blob;
            }
            navigator.clipboard.write([new ClipboardItem(dataItems)]).catch(function () {
                downgradeCopy(plainText);
            });
        }
        else {
            downgradeCopy(plainText);
        }
        return true;
    };

    var dom = null;
    var isReadyToHidden = false;
    var instance = {
        id: "__copy",
        className: "__copy-button",
        getInstance: function () {
            if (dom === null) {
                var container = document.createElement("div");
                container.id = this.id;
                container.className = this.className;
                container.innerText = "复制";
                container.addEventListener("mouseup", function (e) { return e.stopPropagation(); }, true);
                container.addEventListener("mousedown", function (e) { return e.stopPropagation(); }, true);
                dom = container;
                document.body.appendChild(dom);
            }
            return dom;
        },
        show: function (event) {
            if (isReadyToHidden)
                return void 0;
            var dom = this.getInstance();
            dom.style.left = "".concat(event.pageX + 30, "px");
            dom.style.top = "".concat(event.pageY, "px");
            dom.style.opacity = "1";
            dom.style.zIndex = "1000";
        },
        hide: function () {
            var dom = this.getInstance();
            dom.style.opacity = "0";
            isReadyToHidden = true;
            setTimeout(function () {
                dom.style.zIndex = "-10000";
                isReadyToHidden = false;
            }, 350);
        },
        onCopy: function (content, event) {
            var _this = this;
            var dom = this.getInstance();
            this.show(event);
            dom.onclick = function () {
                copy(content);
                _this.hide();
            };
        },
        enable: function () {
            var dom = this.getInstance();
            dom.style.display = "flex";
        },
        disable: function () {
            var dom = this.getInstance();
            dom.style.display = "none";
        },
    };

    var stopNativePropagation = function (event) {
        // event.stopImmediatePropagation(); // 即停且阻止该元素在此事件绑定之后的`on`同类事件触发
        event.stopPropagation(); // 阻止该元素继续冒泡后的`on`同类事件触发
    };
    var utils = {
        hideButton: function () {
            instance.disable();
        },
        showButton: function () {
            instance.enable();
        },
        removeAttributes: function (selector, attr) {
            if (attr === void 0) { attr = []; }
            var dom = isString(selector) ? document.querySelector(selector) : selector;
            dom && attr.forEach(function (item) { return dom.removeAttribute(item); });
        },
        enableUserSelectByCSS: function () {
            var css = "*{user-select: auto !important;-webkit-user-select: auto !important;}";
            var style = document.createElement("style");
            style.innerText = css;
            var head = document.getElementsByTagName("head")[0];
            if (head) {
                head.appendChild(style);
            }
            else {
                window.addEventListener(PAGE_LOADED, function () {
                    return document.getElementsByTagName("head")[0].appendChild(style);
                });
            }
        },
        enableOnSelectStart: function (selector) {
            var dom = document.querySelector(selector);
            dom && dom.addEventListener(SELECT_START, stopNativePropagation);
        },
        enableOnContextMenu: function (selector) {
            var dom = document.querySelector(selector);
            dom && dom.addEventListener(CONTEXT_MENU, stopNativePropagation);
        },
        enableOnCopy: function (selector) {
            var dom = document.querySelector(selector);
            dom && dom.addEventListener(COPY, stopNativePropagation);
        },
        enableOnKeyDown: function (selector) {
            var dom = document.querySelector(selector);
            dom &&
                dom.addEventListener(KEY_DOWN, function (e) {
                    if (e.key === "c" && e.ctrlKey)
                        return e.stopPropagation();
                });
        },
        enableOnSelectStartByCapture: function () {
            window.addEventListener(SELECT_START, stopNativePropagation, true);
            document.addEventListener(SELECT_START, stopNativePropagation, true);
        },
        enableOnContextMenuByCapture: function () {
            window.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
            document.addEventListener(CONTEXT_MENU, stopNativePropagation, true);
        },
        enableOnCopyByCapture: function () {
            window.addEventListener("copy", stopNativePropagation, true);
            document.addEventListener("copy", stopNativePropagation, true);
        },
        enableOnKeyDownByCapture: function () {
            document.addEventListener(KEY_DOWN, function (e) { return e.ctrlKey && e.key.toLocaleUpperCase() === "C" && e.stopPropagation(); }, true);
        },
    };

    var website$p = {
        regexp: /.*wk\.baidu\.com\/view\/.+/,
        init: function () {
            utils.hideButton();
            utils.enableOnSelectStartByCapture();
            window.onload = function () {
                dom$1.attr(".sf-edu-wenku-vw-container", "style", "");
            };
        },
    };

    var website$o = {
        regexp: /.*zhihu\.com\/.*/,
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnCopyByCapture();
        },
    };

    var website$n = {
        regexp: /.*30edu\.com\.cn\/.+/,
        init: function () {
            window.onload = function () {
                var iframes = document.getElementsByTagName("iframe");
                if (iframes.length === 2) {
                    var body = iframes[1].contentWindow.document.querySelector("body");
                    utils.removeAttributes(body, ["oncopy", "oncontextmenu", "onselectstart"]);
                }
            };
        },
    };

    var website$m = {
        regexp: /.*docs\.qq\.com\/.+/,
        config: {
            initCopyEvent: false,
        },
        init: function () {
            window.onload = function () {
                utils.hideButton();
            };
        },
        getSelectedText: function () {
            var _a;
            if (unsafeWindow.pad && unsafeWindow.pad.editor && !unsafeWindow.pad.editor.isCopyable()) {
                utils.showButton();
                var editor = unsafeWindow.pad.editor;
                editor._docEnv.copyable = true;
                editor.clipboardManager.copy();
                var plainText = editor.clipboardManager.customClipboard.plain;
                var htmlText = editor.clipboardManager.customClipboard.html;
                editor._docEnv.copyable = false;
                return _a = {},
                    _a[TEXT_PLAIN] = plainText,
                    _a[TEXT_HTML] = htmlText,
                    _a;
            }
            return "";
        },
    };

    var website$l = {
        regexp: new RegExp(".+://boke112.com/post/.+"),
        init: function () {
            utils.enableOnCopyByCapture();
            var template = "\n            <style>\n                :not(input):not(textarea)::selection {\n                    background-color: #2440B3 !important;\n                    color: #fff !important;\n                }\n\n                :not(input):not(textarea)::-moz-selection {\n                    background-color: #2440B3 !important;\n                    color: #fff !important;\n                }\n            </style>\n        ";
            dom$1.append("head", template);
        },
    };

    var website$k = {
        regexp: /diyifanwen/,
        init: function () {
            utils.hideButton();
            utils.enableOnCopyByCapture();
            utils.enableOnKeyDownByCapture();
        },
    };

    var website$j = {
        regexp: /mbalib/,
        init: function () {
            window.onload = function () {
                utils.removeAttributes("fullScreenContainer", [
                    "oncopy",
                    "oncontextmenu",
                    "onselectstart",
                ]);
            };
        },
    };

    var website$i = {
        regexp: /cnitpm/,
        init: function () {
            utils.hideButton();
            window.onload = function () {
                utils.removeAttributes("body", ["oncopy", "oncontextmenu", "onselectstart"]);
            };
        },
    };

    var website$h = {
        regexp: new RegExp(".+bbs.mihoyo.com/.+"),
        init: function () {
            utils.hideButton();
            utils.enableOnCopyByCapture();
            utils.enableOnSelectStartByCapture();
            utils.enableUserSelectByCSS();
        },
    };

    var website$g = {
        regexp: new RegExp(".+www.uemeds.cn/.+"),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
        },
    };

    var website$f = {
        regexp: new RegExp(".+aiyuke.com/news/.+"),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
        },
    };

    var website$e = {
        regexp: new RegExp("qidian"),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnCopy(".main-read-container");
            utils.enableOnContextMenu(".main-read-container");
        },
    };

    var website$d = {
        regexp: new RegExp("zongheng"),
        init: function () {
            utils.removeAttributes(".reader_box", ["style", "unselectable", "onselectstart"]);
            utils.removeAttributes(".reader_main", ["style", "unselectable", "onselectstart"]);
            utils.hideButton();
            utils.enableOnKeyDown("body");
            utils.enableUserSelectByCSS();
            utils.enableOnCopy(".content");
            utils.enableOnContextMenu("body");
            utils.enableOnSelectStart(".content");
        },
    };

    var website$c = {
        regexp: new RegExp("17k"),
        init: function () {
            utils.hideButton();
            utils.enableOnCopy(".readAreaBox .p");
        },
    };

    var website$b = {
        regexp: new RegExp("ciweimao"),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnCopy("#J_BookCnt");
            utils.enableOnContextMenu("body");
            utils.enableOnSelectStart("#J_BookCnt");
        },
    };

    var website$a = {
        regexp: new RegExp("book\\.qq"),
        init: function () {
            utils.hideButton();
            utils.enableOnCopy("body");
            utils.enableUserSelectByCSS();
            utils.enableOnContextMenu("body");
            utils.enableOnSelectStart("body");
        },
    };

    var website$9 = {
        regexp: new RegExp("utaten"),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnSelectStartByCapture();
        },
    };

    var website$8 = {
        config: {
            runAt: "document-start",
        },
        regexp: new RegExp("wenku.baidu.com/(view|link).*"),
        init: function () {
            dom$1.append("head", "<style>@media print { body{ display:block; } }</style>");
            var canvasDataGroup = [];
            var originObject = {
                context2DPrototype: unsafeWindow.document.createElement("canvas").getContext("2d")
                    .__proto__,
            };
            document.createElement = new Proxy(document.createElement, {
                apply: function (target, thisArg, argumentsList) {
                    var element = Reflect.apply(target, thisArg, argumentsList);
                    if (argumentsList[0] === "canvas") {
                        var tmpData_1 = {
                            canvas: element,
                            data: [],
                        };
                        element.getContext("2d").fillText = function () {
                            var args = [];
                            for (var _i = 0; _i < arguments.length; _i++) {
                                args[_i] = arguments[_i];
                            }
                            tmpData_1.data.push(args);
                            originObject.context2DPrototype.fillText.apply(this, args);
                        };
                        canvasDataGroup.push(tmpData_1);
                    }
                    return element;
                },
            });
            var pageData = {};
            Object.defineProperty(unsafeWindow, "pageData", {
                set: function (v) { return (pageData = v); },
                get: function () {
                    if (!pageData.vipInfo)
                        return (pageData.vipInfo = {});
                    pageData.vipInfo.global_svip_status = 1;
                    pageData.vipInfo.global_vip_status = 1;
                    pageData.vipInfo.isVip = 1;
                    pageData.vipInfo.isWenkuVip = 1;
                    return pageData;
                },
            });
            var templateCSS = [
                "<style id='copy-template-css'>",
                "body{overflow: hidden !important}",
                "#copy-template-html{position: fixed; top: 0; right: 0; bottom: 0; left: 0; display: flex; align-items: center; justify-content: center;z-index: 999999; background: rgba(0,0,0,0.5);}",
                "#copy-template-html > .template-container{height: 80%; width: 80%; background: #fff; }",
                ".template-container > .title-container{display: flex; align-items: center; justify-content: space-between;padding: 10px;border-bottom: 1px solid #eee;}",
                "#copy-template-text{height: 100%; width: 100%;position: relative; overflow: auto;background: #fff;}",
                "#copy-template-html #template-close{cursor: pointer;}",
                "</style>",
            ].join("");
            var render = function () {
                canvasDataGroup = canvasDataGroup.filter(function (item) { return item.canvas.id; });
                var templateText = canvasDataGroup.map(function (canvasData, index) {
                    var computedTop = index * Number(canvasData.canvas.clientHeight);
                    var textItem = canvasData.data.map(function (item) {
                        return "<div style=\"position: absolute; left: ".concat(item[1], "px; top: ").concat(item[2] + computedTop, "px\">").concat(item[0], "</div>");
                    });
                    return textItem.join("");
                });
                var templateHTML = [
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
                dom$1.append("body", templateHTML);
                dom$1.append("body", templateCSS);
                var closeButton = document.querySelector("#copy-template-html #template-close");
                var close = function () {
                    dom$1.remove("#copy-template-html");
                    dom$1.remove("#copy-template-css");
                    closeButton.removeEventListener("click", close);
                };
                closeButton.addEventListener("click", close);
            };
            document.addEventListener("DOMContentLoaded", function () {
                dom$1.append("head", "<style>#copy-btn-wk{padding: 10px; background: rgba(0,0,0,0.5);position: fixed; left:0; top: 40%;cursor: pointer;color: #fff; z-index: 99999;}</style>");
                dom$1.append("body", "<div id='copy-btn-wk'>复制</div>");
                var btn = dom$1.query("#copy-btn-wk");
                btn && (btn.onclick = render);
            });
        },
        getSelectedText: function () {
            if (window.getSelection && window.getSelection().toString()) {
                return window.getSelection().toString();
            }
            var result = /查看全部包含“([\s\S]*?)”的文档/.exec(document.body.innerHTML);
            if (result)
                return result[1];
            return "";
        },
    };

    var website$7 = {
        regexp: new RegExp("xiaohongshu"),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnKeyDownByCapture();
        },
    };

    var website$6 = {
        regexp: new RegExp("leetcode"),
        init: function () {
            utils.hideButton();
            utils.enableOnCopy("#lc-home");
        },
    };

    var website$5 = {
        regexp: /csdn/,
        init: function () {
            utils.hideButton();
            utils.enableOnCopyByCapture();
            utils.enableUserSelectByCSS();
        },
    };

    var website$4 = {
        regexp: new RegExp("bilibili"),
        init: function () {
            utils.hideButton();
            utils.enableOnCopyByCapture();
        },
    };

    var website$3 = {
        regexp: new RegExp("cnki"),
        init: function () {
            utils.hideButton();
            utils.enableOnContextMenuByCapture();
            utils.enableOnKeyDownByCapture();
            utils.enableOnCopyByCapture();
        },
    };

    var website$2 = {
        regexp: new RegExp("docin.com/.*"),
        config: {
            initCopyEvent: false,
            captureInstance: true,
            delay: 100,
        },
        init: function () {
            window.addEventListener(PAGE_LOADED, function () { var _a; return (_a = dom$1.query("#j_select")) === null || _a === void 0 ? void 0 : _a.click(); });
            dom$1.append("head", "<style>#reader-copy-el{display: none;}</style>");
        },
        getSelectedText: function () {
            if (unsafeWindow.docinReader && unsafeWindow.docinReader.searchTextStr) {
                return unsafeWindow.docinReader.searchTextStr;
            }
            return "";
        },
    };

    var website$1 = {
        regexp: new RegExp([
            "commandlinux",
            "cnki",
            "ruiwen",
            "oh100",
            "fwsir",
            "wenxm",
            "unjs",
            "ahsrst",
            "yjbys",
            "360doc",
            "850500",
            "jianbiaoku",
            "kt250",
            "kejudati",
            "baibeike",
            "yuque",
            "cnrencai",
            "kodiplayer",
            "tongxiehui",
            "ndPureView",
            "jianshu",
            "linovelib",
            "chazidian",
            "juejin",
            "zgbk",
            "wenmi",
            "yuedu\\.baidu",
            "inrrp",
            "shubaoc",
            "51cto",
            "ximalaya",
            "xiexiebang",
        ].join("|")),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnCopyByCapture();
        },
    };

    var website = {
        regexp: new RegExp(["wjx", "fanyi\\.baidu", "tianqi"].join("|")),
        init: function () {
            utils.hideButton();
            utils.enableUserSelectByCSS();
            utils.enableOnCopyByCapture();
            utils.enableOnKeyDownByCapture();
            utils.enableOnSelectStartByCapture();
            utils.enableOnContextMenuByCapture();
        },
    };

    var websites = [
        website$q,
        website$p,
        website$o,
        website$n,
        website$m,
        website$l,
        website$k,
        website$j,
        website$i,
        website$h,
        website$g,
        website$f,
        website$e,
        website$d,
        website$c,
        website$b,
        website$a,
        website$9,
        website$8,
        website$7,
        website$r,
        website$6,
        website$5,
        website$4,
        website$3,
        website$2,
        website$1,
        website,
    ];

    var siteGetSelectedText = null;
    var initWebsite = function () {
        var websiteConfig = {
            initCopyEvent: true,
            runAt: DOM_STAGE.END,
            captureInstance: false,
            delay: 0,
        };
        var mather = function (regex, website) {
            if (regex.test(window.location.href)) {
                if (website.config)
                    websiteConfig = Object.assign(websiteConfig, website.config);
                if (websiteConfig.runAt === DOM_STAGE.END) {
                    document.addEventListener(DOM_READY, function () { return website.init(); });
                }
                else {
                    website.init();
                }
                if (website.getSelectedText)
                    siteGetSelectedText = website.getSelectedText;
                return true;
            }
            return false;
        };
        websites.some(function (website) { return mather(website.regexp, website); });
        return websiteConfig;
    };
    var getSelectedText = function () {
        if (siteGetSelectedText)
            return siteGetSelectedText();
        if (window.getSelection)
            return window.getSelection().toString();
        if (document.getSelection)
            return document.getSelection().toString();
        if (document.selection)
            return document.selection.createRange().text;
        return "";
    };

    (function () {
        var websiteConfig = initWebsite();
        initBaseEvent(websiteConfig);
        initBaseStyle();
        document.addEventListener("mouseup", function (e) {
            var handler = function () {
                var content = getSelectedText();
                if (isEmptyContent(content)) {
                    instance.hide();
                    return "";
                }
                instance.onCopy(content, e);
            };
            websiteConfig.delay ? setTimeout(handler, websiteConfig.delay) : handler();
        }, websiteConfig.captureInstance);
    })();

})();
