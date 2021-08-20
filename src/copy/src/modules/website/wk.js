import common from "./common.js";

const website = {
    regexp: /.*wk\.baidu\.com\/view\/.+/,
    init: function($) {
        common.hideButton($);
        $(window).on("load", (e) => {
              $(".sf-edu-wenku-vw-container").attr("style", "");
              $(".sfa-body").on("selectstart", function (e) {
                  e.stopPropagation();
                  return true;
            });
        });
    }
}; 

export default website;