import utils from "../utils/event";
import { Website } from "../websites";

const website: Website = {
    regexp: /.*zhihu\.com\/.*/,
    init: function () {
        utils.hideButton();
        utils.enableUserSelectByCSS();
        utils.enableOnCopyByCapture();

        if (location.hostname === "zhuanlan.zhihu.com") {
            const removeFocalPointModal: MutationCallback = mutationsList => {
                for (const mutation of mutationsList) {
                    const addedNodes = mutation.addedNodes;
                    for (let i = 0; i < addedNodes.length; i++) {
                        const target = addedNodes[i];
                        if (target.nodeType != 1) return void 0;
                        if (
                            target instanceof HTMLDivElement &&
                            target.querySelector("[data-focus-scope-start]")
                        ) {
                            const element = target.querySelector("[data-focus-scope-start]");
                            element &&
                                element.parentElement &&
                                element.parentElement.parentElement &&
                                element.parentElement.parentElement.removeChild(
                                    element.parentElement
                                );
                        }
                    }
                }
            };
            const observer = new MutationObserver(removeFocalPointModal);
            observer.observe(document, { childList: true, subtree: true });
        }
    },
};

export default website;
