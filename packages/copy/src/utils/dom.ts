import { isString } from "./is";

const dom = {
    query: function (selector: string): null | HTMLElement {
        return document.querySelector(selector);
    },
    attr: function (selector: string, attr: string, value: string): void {
        const dom = document.querySelector(selector);
        dom && dom.setAttribute(attr, value);
    },
    append: function (selector: string, content: Element | string): HTMLDivElement {
        const container = document.createElement("div");
        if (isString(content)) {
            container.innerHTML = content;
        } else {
            container.appendChild(content);
        }
        const targetDOM = document.querySelector(selector);
        targetDOM && targetDOM.append(container);
        return container;
    },
    remove: function (selector: string): void {
        const targetDOM = document.querySelector(selector);
        targetDOM && targetDOM.remove();
    },
};

export default dom;
