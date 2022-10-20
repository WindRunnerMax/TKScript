import "./index.css";

const STORAGE_VALUE = {
    OPEN: "true",
    CLOSE: "false",
};
export enum BUTTON_STATUS {
    OPEN,
    CLOSE,
}
export type ControllerItem = {
    status: BUTTON_STATUS;
    storageKey: string;
    openName: string;
    closeName: string;
    openFunction: () => void;
    closeFunction: () => void;
};
export const STORAGE_KEY_PREFIX = "copy-currency--";

export const register = (controllers: ControllerItem[]): void => {
    const container = document.createElement("div");
    container.className = "__copy-currency-container";
    document.body.appendChild(container);
    controllers.forEach(controller => {
        const button = document.createElement("div");
        button.className = "__copy-currency-button";
        const localHookInfo = localStorage.getItem(STORAGE_KEY_PREFIX + controller.storageKey);
        // 初始加载会直接调用处理函数 状态置反
        controller.status =
            localHookInfo === STORAGE_VALUE.OPEN ? BUTTON_STATUS.CLOSE : BUTTON_STATUS.OPEN;
        const handler = () => {
            if (controller.status === BUTTON_STATUS.CLOSE) {
                controller.openFunction();
                controller.status = BUTTON_STATUS.OPEN;
                button.textContent = controller.closeName;
                localStorage.setItem(
                    STORAGE_KEY_PREFIX + controller.storageKey,
                    STORAGE_VALUE.OPEN
                );
            } else {
                controller.closeFunction();
                controller.status = BUTTON_STATUS.CLOSE;
                button.textContent = controller.openName;
                localStorage.setItem(
                    STORAGE_KEY_PREFIX + controller.storageKey,
                    STORAGE_VALUE.CLOSE
                );
            }
        };
        handler();
        button.addEventListener("click", handler);
        container.appendChild(button);
    });
};
