import { WebsiteConfig } from "./websites";

export const initEvent = ($: JQueryStatic, websiteConfig: WebsiteConfig): void => {
    $("body").on("mousedown", () => $("#_copy").remove());
    if (websiteConfig.initCopyEvent) {
        document.oncopy = e => e.stopPropagation();
        document.body.oncopy = e => e.stopPropagation();
        $("body").on("copy", e => {
            e.stopPropagation();
            return true;
        });
    }
};

export const bindClipboardEvent = (clipboard: ClipboardJS): void => {
    clipboard.on("success", e => {
        $("#_copy").html("复制成功");
        setTimeout(() => $("#_copy").fadeOut(1000), 1000);
        e.clearSelection();
    });
    clipboard.on("error", e => {
        $("#_copy").html("复制失败");
        setTimeout(() => $("#_copy").fadeOut(1000), 1000);
        e.clearSelection();
    });
};
