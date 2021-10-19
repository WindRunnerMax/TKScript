export default {
    hideButton: function($){
        $("body").append(`<style id="copy-hide">#_copy{display: none !important;}</style>`);
    },
    showButton: function($){
        $("#copy-hide").remove();
    },
    enableUserSelect: function($, selector, inline = false){
        const cur = $(selector);
        if(inline){
            cur.css("user-select", "auto !important");
            cur.css("-webkit-user-select", "auto !important");
        }else{
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
    enableOnSelectStart: function($, selector){
        $(selector).on("selectstart", e => {
            e.stopPropagation();
            return true;
        });
    },
    enableOnContextMenu: function($, selector){
        $(selector).on("contextmenu", e => {
            e.stopPropagation();
            return true;
        });
    },
    enableOnCopy: function($, selector){
        $(selector).on("copy", e => {
            e.stopPropagation();
            return true;
        });
    },
    enableOnKeyDown: function($, selector){
        $(selector).on("keydown", e => {
            if(e.key === "c" && e.ctrlKey){
                e.stopPropagation();
                return true;
            }
        });
    },
    removeAttributes: function($, selector, attr = []){
        const dom = $(selector);
        attr.forEach(item => dom.removeAttr(item));
    },
}; 
