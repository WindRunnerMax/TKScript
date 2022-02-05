export default {
    insertCSS: (id: string, css: string): void => {
        const style = document.createElement("style");
        style.id = id;
        style.innerHTML = css;
        document.getElementsByTagName("head")[0].appendChild(style);
    },
    removeCSS: (id: string): void => {
        document.getElementsByTagName("head")[0].removeChild(document.getElementById(id));
    },
};
