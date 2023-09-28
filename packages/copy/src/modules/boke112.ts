import dom from "../utils/dom";
import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
  regexp: new RegExp(".+://boke112.com/post/.+"),
  init: function () {
    utils.enableOnCopyByCapture();
    const template = `
            <style>
                :not(input):not(textarea)::selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }

                :not(input):not(textarea)::-moz-selection {
                    background-color: #2440B3 !important;
                    color: #fff !important;
                }
            </style>
        `;
    dom.append("head", template);
  },
};

export default website;
