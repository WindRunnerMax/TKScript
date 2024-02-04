import dom from "../utils/dom";
import type { Website } from "../websites";

const website: Website = {
  regexp: /.*segmentfault\.com\/.+/,
  init: function () {
    const body = dom.query("body");
    if (body) {
      body.classList.add("_sf_adjust_body");
      body.onclick = () => {
        body.style.paddingRight = "0";
      };
    }
  },
};

export default website;
