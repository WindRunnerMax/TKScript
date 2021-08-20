function initEvent($, ClipboardJS) {
    $("body").on("mousedown", () => {
        $("#_copy").remove();
    });
    document.oncopy = (e) => e.stopPropagation();
    document.body.oncopy = (e) => e.stopPropagation();
    $("body").on("copy", (e) => {
        e.stopPropagation();
        return true;
    });

    ClipboardJS.prototype.on("success", function(e) {
        $("#_copy").html("复制成功");
        setTimeout(() => $("#_copy").fadeOut(1000), 1000);
        e.clearSelection();
    });
    ClipboardJS.prototype.on("error", function(e) {
        $("#_copy").html("复制失败");
        setTimeout(() => $("#_copy").fadeOut(1000), 1000);
        e.clearSelection();
    });
}

export { initEvent };