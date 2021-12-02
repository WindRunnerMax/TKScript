import utils from "../utils";
import { Website } from "../websites";

let restrictCopying = true;

const website: Website = {
    regexp: /.*docs\.qq\.com\/.+/,
    config: {
        initCopyEvent: false,
    },
    init: function ($) {
        window.onload = () => {
            if (unsafeWindow.pad) {
                if (unsafeWindow.pad.editor._docEnv.copyable === true) {
                    // 不限制复制
                    restrictCopying = false;
                    utils.hideButton($);
                } else {
                    unsafeWindow.pad.editor._docEnv.copyable = true;
                }
            } else {
                restrictCopying = false;
                utils.hideButton($);
            }
        };
    },
    getSelectedText: function () {
        if (!restrictCopying) return "";
        if (unsafeWindow.pad) {
            unsafeWindow.pad.editor._docEnv.copyable = true;
            unsafeWindow.pad.editor.clipboardManager.copy();
            return unsafeWindow.pad.editor.clipboardManager.customClipboard.plain;
        }
        return "";
    },
};

export default website;
