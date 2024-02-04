import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: /mbalib/,
  init: function () {
    window.onload = () => {
      utils.removeAttributes("fullScreenContainer", ["oncopy", "oncontextmenu", "onselectstart"]);
    };
  },
};

export default website;
