import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: /cnitpm/,
  init: function () {
    utils.hideButton();
    window.onload = () => {
      utils.removeAttributes("body", ["oncopy", "oncontextmenu", "onselectstart"]);
    };
  },
};

export default website;
