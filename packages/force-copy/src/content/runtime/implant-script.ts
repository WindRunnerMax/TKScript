import { cross } from "@/utils/global";

export const implantScript = () => {
  const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", cross.runtime.getURL("inject.js"));
  document.documentElement.appendChild(script);
  script.onload = () => script.remove();
};
