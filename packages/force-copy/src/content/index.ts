import { sendReloadMsg } from "../utils/reload";

if (process.env.NODE_ENV === "development") {
  sendReloadMsg();
}

const script = document.createElementNS("http://www.w3.org/1999/xhtml", "script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", chrome.runtime.getURL("inject.js"));
document.documentElement.appendChild(script);
script.onload = () => script.remove();
