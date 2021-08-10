import common from "./common.js";

const website = {
    regexp: /.*zhihu\.com\/pub\/reader\/.+/,
    init: function($) {
        setTimeout(common.showButton, 500, $);
    }
}; 

export default website;