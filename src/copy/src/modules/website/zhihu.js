
const website = {
    regexp: /.*zhihu\.com\/.+/,
    init: function($) {
        $("body").append("<style>#_copy{display: none !important;}</style>");
    }
} 

export default website;