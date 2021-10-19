import utils from "../utils";

const website = {
    regexp: /.*wk\.baidu\.com\/view\/.+/,
    init: function($) {
        utils.hideButton($);
        $(window).on("load", () => {
              $(".sf-edu-wenku-vw-container").attr("style", "");
              $(".sfa-body").on("selectstart", e => {
                  e.stopPropagation();
                  return true;
            });
        });
    }
}; 

export default website;