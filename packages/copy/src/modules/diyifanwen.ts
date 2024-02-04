import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: /diyifanwen/,
  init: function () {
    utils.hideButton();
    utils.enableOnCopyByCapture();
    utils.enableOnKeyDownByCapture();
  },
};

export default website;
