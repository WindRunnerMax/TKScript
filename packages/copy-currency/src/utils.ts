export default {
  insertCSS: (id: string, css: string): void => {
    const style = document.createElement("style");
    style.id = id;
    style.innerText = css;
    const [body] = document.getElementsByTagName("body");
    if (body) {
      body.appendChild(style);
    } else {
      window.addEventListener("DOMContentLoaded", () => document.body.appendChild(style));
    }
  },
  removeCSS: (id: string): void => {
    const style = document.getElementById(id);
    style && document.head.removeChild(style);
  },
};
