export default {
    insertCSS: (id: string, css: string): void => {
        const style = document.createElement("style");
        style.id = id;
        style.innerHTML = css;
        const head = document.getElementsByTagName("head")[0];
        if (head) {
            head.appendChild(style);
        } else {
            window.onload = () => document.getElementsByTagName("head")[0].appendChild(style);
        }
    },
    removeCSS: (id: string): void => {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
    },
};
