import { copy, CopyParams } from "./copy";

let dom: null | HTMLDivElement = null;

const instance = {
    id: "__copy",
    className: "__copy-button",
    getInstance: function (): HTMLDivElement {
        if (dom === null) {
            const container = document.createElement("div");
            container.id = this.id;
            container.className = this.className;
            dom = container;
            document.body.appendChild(dom);
        }
        return dom as HTMLDivElement;
    },
    show: function (event: MouseEvent): void {
        const dom = this.getInstance();
        dom.style.left = `${event.pageX + 30}px`;
        dom.style.top = `${event.pageY}px`;
        dom.style.opacity = "1";
        dom.style.visibility = "visible";
        dom.style.zIndex = "1000";
    },
    hide: function (): void {
        const dom = this.getInstance();
        dom.style.opacity = "0";
        dom.style.visibility = "hidden";
        setTimeout(() => (dom.style.zIndex = "-10000"), 350);
    },
    onCopy: function (content: CopyParams, event: MouseEvent): void {
        const dom = this.getInstance();
        this.show(event);
        dom.onclick = () => {
            copy(content);
            this.hide();
        };
    },
    enable: function (): void {
        const dom = this.getInstance();
        dom.style.display = "flex";
    },
    disable: function (): void {
        const dom = this.getInstance();
        dom.style.display = "none";
    },
};
export default instance;
