import utils from "./utils";

enum BUTTON_STATUS {
    OPEN,
    CLOSE,
}

const STORAGE_VALUE = {
    OPEN: "true",
    CLOSE: "false",
};
const STORAGE_KEY_PREFIX = "copy-currency--";
const stopNativePropagation = (event: Event) => event.stopPropagation();

const controllerMapper: {
    status: BUTTON_STATUS;
    storageKey: string;
    openName: string;
    closeName: string;
    openFunction: () => void;
    closeFunction: () => void;
}[] = [
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

const menuIds: number[] = [];
const switchFunctions: (() => void)[] = [];

const batchUpdateButtons = () => {
    controllerMapper.forEach((item, index) => {
        GM_unregisterMenuCommand(menuIds[index]);
        if (item.status === BUTTON_STATUS.OPEN) {
            menuIds[index] = GM_registerMenuCommand(item.closeName, switchFunctions[index]);
        } else {
            menuIds[index] = GM_registerMenuCommand(item.openName, switchFunctions[index]);
        }
    });
};

(function () {
    controllerMapper.forEach(item => {
        const localHookInfo = localStorage.getItem(STORAGE_KEY_PREFIX + item.storageKey);
        const switchButtonStatus = () => {
            if (item.status === BUTTON_STATUS.OPEN) {
                item.status = BUTTON_STATUS.CLOSE;
                item.closeFunction();
                localStorage.setItem(STORAGE_KEY_PREFIX + item.storageKey, STORAGE_VALUE.CLOSE);
            } else {
                item.status = BUTTON_STATUS.OPEN;
                item.openFunction();
                localStorage.setItem(STORAGE_KEY_PREFIX + item.storageKey, STORAGE_VALUE.OPEN);
            }
            batchUpdateButtons();
        };
        switchFunctions.push(switchButtonStatus);
        if (localHookInfo === STORAGE_VALUE.OPEN) {
            item.status = BUTTON_STATUS.OPEN;
            item.openFunction();
        } else {
            item.status = BUTTON_STATUS.CLOSE;
        }
    });
    batchUpdateButtons();
})();
