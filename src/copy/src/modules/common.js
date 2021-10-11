
const website = {
    regexp: new RegExp("commandlinux|cnki|leetcode-cn|ruiwen|oh100|fwsir|wenxm|unjs|ahsrst"),
    init: function($) {
        $("body").append(`<style id="copy-hide">#_copy{display: none !important;}</style>`);
    },
    hideButton: function($){
        this.init($);
    },
    showButton: function($){
        $("#copy-hide").remove();
    }
}; 

export default website;