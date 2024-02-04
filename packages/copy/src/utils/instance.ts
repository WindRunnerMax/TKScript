import type { CopyParams } from "./copy";
import { copy } from "./copy";

let dom: null | HTMLDivElement = null;
let isReadyToHidden = false;

const instance = {
  id: "__copy",
  className: "__copy-button",
  init: function (name?: string) {
    const container = document.createElement("div");
    container.id = this.id;
    container.className = this.className;
    container.innerText = name || "复制";
    container.addEventListener("mouseup", e => e.stopPropagation(), true);
    container.addEventListener("mousedown", e => e.stopPropagation(), true);
    dom = container;
    document.body.appendChild(dom);
  },
  getInstance: function (): HTMLDivElement {
    if (dom === null) {
      this.init();
    }
    return dom as HTMLDivElement;
  },
  show: function (event: MouseEvent): void {
    if (isReadyToHidden) return void 0;
    const dom = this.getInstance();
    dom.style.left = `${event.pageX + 30}px`;
    dom.style.top = `${event.pageY}px`;
    dom.style.opacity = "1";
    dom.style.zIndex = "1000";
  },
  hide: function (keep: number | false = 350): void {
    const dom = this.getInstance();
    dom.style.opacity = "0";
    if (keep) {
      isReadyToHidden = true;
      setTimeout(() => {
        dom.style.zIndex = "-10000";
        isReadyToHidden = false;
      }, keep);
    }
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
  destroy: function (): void {
    const el = this.getInstance();
    el.remove();
    dom = null;
  },
};
export default instance;
