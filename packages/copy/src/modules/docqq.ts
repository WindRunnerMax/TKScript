import { TEXT_HTML, TEXT_PLAIN } from "../utils/copy";
import utils from "../utils/utils";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*docs\.qq\.com\/.+/,
    config: {
        initCopyEvent: false,
    },
    init: function () {
        window.onload = () => {
            utils.hideButton();
        };
    },
    getSelectedText: function () {
        if (unsafeWindow.pad && unsafeWindow.pad.editor && !unsafeWindow.pad.editor.isCopyable()) {
            utils.showButton();
            const editor = unsafeWindow.pad.editor;
            editor._docEnv.copyable = true;
            editor.clipboardManager.copy();
            const plainText: string = editor.clipboardManager.customClipboard.plain;
            const htmlText: string = editor.clipboardManager.customClipboard.html;
            editor._docEnv.copyable = false;
            return {
                [TEXT_PLAIN]: plainText,
                [TEXT_HTML]: htmlText,
            };
        }
        return "";
    },
};

export default website;
