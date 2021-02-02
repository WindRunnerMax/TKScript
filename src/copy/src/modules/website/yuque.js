
const website = {
    regexp: new RegExp(".+://www.yuque.com/.+"),
    init: function($) {
        $("body").append("<style>#_copy{display: none !important;}</style>");
    }
} 

export default website;