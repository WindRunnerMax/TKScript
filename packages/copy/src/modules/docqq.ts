import { TEXT_HTML, TEXT_PLAIN } from "../utils/copy";
import { instance } from "../utils/instance";
import type { Website } from "../websites";

const website: Website = {
  regexp: /.*docs\.qq\.com\/(doc)|(sheet)\/.+/,
  config: {
    initCopyEvent: false,
    captureInstance: true,
    delay: 100,
  },
  init: function () {
    window.onload = () => {
      instance.disable();
    };
  },
  getSelectedText: function () {
    // QQ Doc
    if (unsafeWindow.pad && unsafeWindow.pad.editor && !unsafeWindow.pad.editor.isCopyable()) {
      instance.enable();
      const editor = unsafeWindow.pad.editor;
      if (editor.getCopyContent) {
        const content = editor.getCopyContent() || {};
        const plainText: string = content.plain || "";
        const htmlText: string = content.html || "";
        return {
          [TEXT_PLAIN]: plainText,
          [TEXT_HTML]: htmlText,
        };
      } else {
        editor._docEnv.copyable = true;
        editor.clipboardManager.copy();
        const plainText: string = editor.clipboardManager.customClipboard.plain || "";
        const htmlText: string = editor.clipboardManager.customClipboard.html || "";
        editor._docEnv.copyable = false;
        return {
          [TEXT_PLAIN]: plainText,
          [TEXT_HTML]: htmlText,
        };
      }
    }
    // QQ Sheet
    const sheetStatus = unsafeWindow.SpreadsheetApp
      ? unsafeWindow.SpreadsheetApp.permissions
        ? unsafeWindow.SpreadsheetApp.permissions.sheetStatus
        : unsafeWindow.SpreadsheetApp.sheetStatus
      : null;
    if (
      sheetStatus &&
      sheetStatus.canCopy === false &&
      sheetStatus.canEdit &&
      sheetStatus.canEdit() === false
    ) {
      instance.enable();
      const SpreadsheetApp = unsafeWindow.SpreadsheetApp;
      const [selection] = SpreadsheetApp.view.getSelectionRanges();
      if (selection) {
        const text: string[] = [];
        const { startColIndex, startRowIndex, endColIndex, endRowIndex } = selection;
        for (let i = startRowIndex; i <= endRowIndex; i++) {
          for (let k = startColIndex; k <= endColIndex; k++) {
            const cell = SpreadsheetApp.workbook.activeSheet.getCellDataAtPosition(i, k);
            if (!cell) continue;
            text.push(" ", cell.formattedValue?.value || cell.value || "");
          }
          i !== endRowIndex && text.push("\n");
        }
        const str = text.join("");
        return /^\s*$/.test(str) ? "" : str;
      }
    }
    // Final
    return "";
  },
};

export default website;

// SpreadsheetApp.feature._copyPaste.copyPasteCache.onCopy({
//   selectGridRange: SpreadsheetApp.view.getSelectionRanges()[0],
//   copyType: 0,
//   app: SpreadsheetApp.feature.app,
//   isSelectAll: undefined,
// });
// SpreadsheetApp.sheetStatus.workbookStatus.status.setCanCopy(true);
