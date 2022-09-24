import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*zhihu\.com\/pub\/reader\/.+/,
    init: function () {
        setTimeout(utils.showButton, 500);
    },
};

export default website;
