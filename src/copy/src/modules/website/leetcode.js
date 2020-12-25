
const website = {
    regexp: /.*leetcode-cn\.com\/problems\/.+/,
    init: function($) {
        $("body").append("<style>#_copy{display: none !important;}</style>");
    }
} 

export default website;