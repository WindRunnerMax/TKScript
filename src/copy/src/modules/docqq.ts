import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*docs\.qq\.com\/.+/,
    config: {
        initCopyEvent: false,
    },
    init: function ($) {
        window.onload = () => {
            utils.hideButton($);
        };
    },
    getSelectedText: function () {
        if (unsafeWindow.pad && unsafeWindow.pad.editor && !unsafeWindow.pad.editor.isCopyable()) {
            utils.showButton($);
            const editor = unsafeWindow.pad.editor;
            editor._docEnv.copyable = true;
            editor.clipboardManager.copy();
            const result: string = editor.clipboardManager.customClipboard.plain;
            editor._docEnv.copyable = false;
            return result;
        }
        return "";
    },
};

export default website;
