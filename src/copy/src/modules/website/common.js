
const website = {
    regexp: new RegExp("commandlinux|cnki"),
    init: function($) {
        $("body").append("<style>#_copy{display: none !important;}</style>");
    }
} 

export default website;