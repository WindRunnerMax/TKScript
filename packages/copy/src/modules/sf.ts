import dom from "../utils/dom";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*segmentfault\.com\/.+/,
    init: function () {
        const body = dom.query("body");
        body.classList.add("_sf_adjust_body");
        body.onclick = () => {
            body.style.paddingRight = "0";
        };
    },
};

export default website;
