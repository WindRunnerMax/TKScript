export const insertCSS = (id: string, css: string): void => {
  const style = document.createElement("style");
  style.id = id;
  style.innerHTML = css;
  const [head] = document.getElementsByTagName("head");
  if (head) {
    head.appendChild(style);
  } else {
    window.onload = () => document.head.appendChild(style);
  }
};
export const removeCSS = (id: string): void => {
  const style = document.getElementById(id);
  style && document.head.removeChild(style);
};
