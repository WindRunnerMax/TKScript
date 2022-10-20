import { BUTTON_STATUS, ControllerItem, register, STORAGE_KEY_PREFIX } from "./register";
import utils from "./utils";

const stopNativePropagation = (event: Event) => event.stopPropagation();
const CONTROLLER_MAP: ControllerItem[] = [
    {
        status: BUTTON_STATUS.CLOSE,
        storageKey: "selectstart-and-copy",
        openName: "✅ 启动解除复制限制",
        closeName: "❌ 关闭解除复制限制",
        openFunction: () => {
            document.addEventListener("selectstart", stopNativePropagation, true);
            document.addEventListener("copy", stopNativePropagation, true);
            utils.insertCSS(
                STORAGE_KEY_PREFIX + "selectstart-and-copy",
                "*{user-select: auto !important;-webkit-user-select: auto !important;}"
            );
        },
        closeFunction: () => {
            document.removeEventListener("selectstart", stopNativePropagation, true);
            document.removeEventListener("copy", stopNativePropagation, true);
            utils.removeCSS(STORAGE_KEY_PREFIX + "selectstart-and-copy");
        },
    },
    {
        status: BUTTON_STATUS.CLOSE,
        storageKey: "contextmenu",
        openName: "✅ 启动解除右键限制",
        closeName: "❌ 关闭解除右键限制",
        openFunction: () => document.addEventListener("contextmenu", stopNativePropagation, true),
        closeFunction: () =>
            document.removeEventListener("contextmenu", stopNativePropagation, true),
    },
    {
        status: BUTTON_STATUS.CLOSE,
        storageKey: "keydown",
        openName: "✅ 启动解除键盘限制",
        closeName: "❌ 关闭解除键盘限制",
        openFunction: () => document.addEventListener("keydown", stopNativePropagation, true),
        closeFunction: () => document.removeEventListener("keydown", stopNativePropagation, true),
    },
];

(function () {
    register(CONTROLLER_MAP);
})();
