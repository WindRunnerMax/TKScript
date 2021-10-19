import utils from "../utils";

const website = {
    regexp: new RegExp("commandlinux|cnki|leetcode-cn|ruiwen|oh100|fwsir|wenxm|unjs|ahsrst|yjbys"),
    init: function($) {
        utils.hideButton($);
    },
}; 

export default website;