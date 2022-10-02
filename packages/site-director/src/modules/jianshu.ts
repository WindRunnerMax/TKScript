import { Website } from "../websites";

const website: Website = {
    regexp: /jianshu/,
    init: function () {
        const result = /.*jianshu.com\/go-wild.*url=(.*)/.exec(location.href);
        if (result) {
            const url = decodeURIComponent(result[1]);
            if (url) {
                location.href = url;
            }
        }
    },
};

export default website;
