import { Website } from "../websites";

const website: Website = {
    regexp: /csdn/,
    init: function () {
        const result = /.*link.csdn.net\/\?target=(.*)/.exec(location.href);
        if (result) {
            const url = decodeURIComponent(result[1]);
            if (url) {
                console.log(url);
                location.href = url;
            }
        }
    },
};

export default website;
