import utils from "../utils";

const website = {
    regexp: /.*zhihu\.com\/pub\/reader\/.+/,
    init: function($) {
        setTimeout(utils.showButton, 500, $);
    }
}; 

export default website;