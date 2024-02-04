import { DOM_STAGE } from "../constant/event";
import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  config: {
    runAt: DOM_STAGE.START,
  },
  regexp: new RegExp(["examcoo"].join("|")),
  init: function () {
    utils.hideButton();
    utils.enableUserSelectByCSS();
    utils.enableOnCopyByCapture();
    utils.enableOnKeyDownByCapture();
    utils.enableOnSelectStartByCapture();
    utils.enableOnContextMenuByCapture();
  },
};

export default website;
