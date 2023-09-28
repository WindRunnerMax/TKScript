import dom from "../utils/dom";
import { Website } from "../websites";

/*!
 * 外部引用`static.doc88.com`声明
 * 此部分是在处理`doc88.com`才会加载的资源文件，此资源文件由该网站加载时提供
 */

let path = "";
const website: Website = {
  regexp: /.*doc88\.com\/.+/,
  init: () => {
    // GM_xmlhttpRequest({
    //     method: "GET",
    //     url: "https://res.doc88.com/assets/js/v2.js",
    //     onload: function(response) {
    //         var view = new Function("var view = " + response.responseText.replace("eval", "") + "; return view;");
    //         path = /<textarea[\s\S]*?Viewer.([\S]*?)\+[\S]*?\/textarea>/.exec(view())[1];
    //     }
    // })
    dom.append(
      "body",
      `<style id="copy-element-hide">#left-menu{display: none !important;}</style>`
    );
    GM_xmlhttpRequest({
      method: "GET",
      url: "https://res3.doc88.com/resources/js/modules/main-v2.min.js?v=2.56",
      onload: function (response) {
        const result = /\("#cp_textarea"\).val\(([\S]*?)\);/.exec(response.responseText);
        if (result) path = result[1];
      },
    });
    window.addEventListener("load", () => {
      const cpFn = unsafeWindow.copyText.toString();
      const fnResult = /<textarea[\s\S]*?>'\+([\S]*?)\+"<\/textarea>/.exec(cpFn);
      if (fnResult) path = fnResult[1];
    });
  },
  getSelectedText: (): string => {
    let select = unsafeWindow;
    path.split(".").forEach((v: string) => {
      select = select[v];
    });
    if (!select) {
      unsafeWindow.Config.vip = 1;
      unsafeWindow.Config.logined = 1;
      dom.remove("#copy-element-hide");
    }
    return select;
  },
};

export default website;
