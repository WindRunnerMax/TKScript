const stopJQueryPropagation = (
    event: JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>
) => {
    event.stopPropagation();
    // event.stopImmediatePropagation(); // 即停且阻止该元素后`on`同类事件触发
    return true; // 若为 `false` 则会 `preventDefault` `stopPropagation`
};

const stopNativePropagation = (event: Event) => event.stopPropagation();

export default {
    hideButton: ($: JQueryStatic): void => {
        $("body").append(`<style id="copy-hide">#_copy{display: none !important;}</style>`);
    },
    showButton: ($: JQueryStatic): void => {
        $("#copy-hide").remove();
    },
    removeAttributes: ($: JQueryStatic, selector: string, attr: string[] = []): void => {
        const dom = $(selector);
        attr.forEach(item => dom.removeAttr(item));
    },
    enableUserSelect: ($: JQueryStatic, selector: string, inline = false): void => {
        if (inline) {
            const cur = $(selector);
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
        $(selector).on("selectstart", stopJQueryPropagation);
    },
    enableOnContextMenu: ($: JQueryStatic, selector: string): void => {
        $(selector).on("contextmenu", stopJQueryPropagation);
    },
    enableOnCopy: ($: JQueryStatic, selector: string): void => {
        $(selector).on("copy", stopJQueryPropagation);
    },
    enableOnKeyDown: ($: JQueryStatic, selector: string): void => {
        $(selector).on("keydown", e => {
            if (e.key === "c" && e.ctrlKey) return stopJQueryPropagation(e);
        });
    },
    enableOnSelectStartByCapture: (): void => {
        document.addEventListener("selectstart", stopNativePropagation, true);
    },
    enableOnContextMenuByCapture: (): void => {
        document.addEventListener("contextmenu", stopNativePropagation, true);
    },
    enableOnCopyByCapture: (): void => {
        document.addEventListener("copy", stopNativePropagation, true);
    },
    enableOnKeyDownByCapture: (): void => {
        document.addEventListener(
            "keydown",
            e => e.ctrlKey && e.key.toLocaleUpperCase() === "C" && e.stopPropagation(),
            true
        );
    },
};
