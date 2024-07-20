import type { CopyParams } from "./copy";
import { copy } from "./copy";

class Instance {
  private readonly id = "__copy";
  private readonly className = "__copy-button";
  private isReadyToHidden = false;
  private dom: null | HTMLDivElement = null;

  public enable = (): void => {
    const dom = this.getInstance();
    dom.style.display = "flex";
  };

  public disable = (): void => {
    const dom = this.getInstance();
    dom.style.display = "none";
  };

  public destroy = (): void => {
    const el = this.getInstance();
    el.remove();
    this.dom = null;
  };

  private init = (name?: string) => {
    const container = document.createElement("div");
    container.id = this.id;
    container.className = this.className;
    container.innerText = name || "复制";
    container.addEventListener("mouseup", e => e.stopPropagation(), true);
    container.addEventListener("mousedown", e => e.stopPropagation(), true);
    this.dom = container;
    document.body.appendChild(this.dom);
  };

  public getInstance = (): HTMLDivElement => {
    if (this.dom === null) {
      this.init();
    }
    return <HTMLDivElement>this.dom;
  };

  public show = (event: MouseEvent): void => {
    if (this.isReadyToHidden) return void 0;
    const dom = this.getInstance();
    dom.style.left = `${event.pageX + 30}px`;
    dom.style.top = `${event.pageY}px`;
    dom.style.opacity = "1";
    dom.style.zIndex = "1000";
  };

  public hide = (keep: number | false = 350): void => {
    const dom = this.getInstance();
    dom.style.opacity = "0";
    if (keep) {
      this.isReadyToHidden = true;
      setTimeout(() => {
        dom.style.zIndex = "-10000";
        this.isReadyToHidden = false;
      }, keep);
    }
  };

  public onCopy = (content: CopyParams, event: MouseEvent): void => {
    const dom = this.getInstance();
    this.show(event);
    dom.onclick = () => {
      copy(content);
      this.hide();
    };
  };
}

export const instance = new Instance();
export default instance;
