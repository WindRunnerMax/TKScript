import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*docs\.qq\.com\/.+/,
    config: {
        initCopyEvent: false,
    },
    init: function ($) {
        window.onload = () => {
            if (unsafeWindow.pad) {
                if (unsafeWindow.pad.editor._docEnv.copyable === true) {
                    this.getSelectedText = null;
                    utils.hideButton($);
                }
                unsafeWindow.pad.editor._docEnv.copyable = true;
            } else {
                utils.hideButton($);
            }
        };
    },
    getSelectedText: function () {
        if (unsafeWindow.pad) {
            unsafeWindow.pad.editor._docEnv.copyable = true;
            unsafeWindow.pad.editor.clipboardManager.copy();
            return unsafeWindow.pad.editor.clipboardManager.customClipboard.plain;
        }
        return void 0;
    },
};

export default website;
