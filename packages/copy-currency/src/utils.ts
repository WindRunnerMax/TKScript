export default {
  insertCSS: (id: string, css: string): void => {
    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = css;
    const [head] = document.getElementsByTagName("head");
    if (head) {
      head.appendChild(style);
    } else {
      window.addEventListener("load", () => document.head.appendChild(style));
    }
  },
  removeCSS: (id: string): void => {
    const style = document.getElementById(id);
    style && document.head.removeChild(style);
  },
};
