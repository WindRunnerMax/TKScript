export default {
    hideButton: ($: JQueryStatic): void => {
        $("body").append(`<style id="copy-hide">#_copy{display: none !important;}</style>`);
    },
    showButton: ($: JQueryStatic): void => {
        $("#copy-hide").remove();
    },
    enableUserSelect: ($: JQueryStatic, selector: string, inline = false): void => {
        const cur = $(selector);
        if (inline) {
            cur.css("user-select", "auto");
            cur.css("-webkit-user-select", "auto");
        } else {
            const template = `
                <style>
                    ${selector}{
                        user-select: auto !important;
                        -webkit-user-select: auto !important;
                    }
                </style>
            `;
            $("body").append(template.replace(/\s*/, " "));
        }
    },
    enableOnSelectStart: ($: JQueryStatic, selector: string): void => {
        $(selector).on("selectstart", e => {
            e.stopPropagation();
            return true;
        });
    },
    enableOnContextMenu: ($: JQueryStatic, selector: string): void => {
        $(selector).on("contextmenu", e => {
            e.stopPropagation();
            return true;
        });
    },
    enableOnCopy: ($: JQueryStatic, selector: string): void => {
        $(selector).on("copy", e => {
            e.stopPropagation();
            return true;
        });
    },
    enableOnKeyDown: ($: JQueryStatic, selector: string): void => {
        $(selector).on("keydown", e => {
            if (e.key === "c" && e.ctrlKey) {
                e.stopPropagation();
                return true;
            }
        });
    },
    removeAttributes: ($: JQueryStatic, selector: string, attr: string[] = []): void => {
        const dom = $(selector);
        attr.forEach(item => dom.removeAttr(item));
    },
};
