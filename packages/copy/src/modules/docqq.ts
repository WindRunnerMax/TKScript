import { TEXT_HTML, TEXT_PLAIN } from "../utils/copy";
import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*docs\.qq\.com\/.+/,
    config: {
        initCopyEvent: false,
        captureInstance: true,
        delay: 100,
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
            if (editor.getCopyContent) {
                const content = editor.getCopyContent() || {};
                const plainText: string | undefined = content.plain;
                const htmlText: string | undefined = content.html;
                return {
                    [TEXT_PLAIN]: plainText,
                    [TEXT_HTML]: htmlText,
                };
            } else {
                editor._docEnv.copyable = true;
                editor.clipboardManager.copy();
                const plainText: string | undefined = editor.clipboardManager.customClipboard.plain;
                const htmlText: string | undefined = editor.clipboardManager.customClipboard.html;
                editor._docEnv.copyable = false;
                return {
                    [TEXT_PLAIN]: plainText,
                    [TEXT_HTML]: htmlText,
                };
            }
        }
        return "";
    },
};

export default website;
