
const website = {
    regexp: /.*zhihu\.com\/.+/,
    init: function($) {
        $("body").append(`<style id="copy-hide" >#_copy{display: none !important;}</style>`);
    }
} 

export default website;