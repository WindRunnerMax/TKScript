import dom from "../utils/dom";
import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
  regexp: /.*wk\.baidu\.com\/view\/.+/,
  init: function () {
    utils.hideButton();
    utils.enableOnSelectStartByCapture();
    window.onload = () => {
      dom.attr(".sf-edu-wenku-vw-container", "style", "");
    };
  },
};

export default website;
