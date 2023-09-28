// ==UserScript==
// @name         阿里图标库CDN添加HTTP按钮
// @namespace    https://github.com/WindrunnerMax/TKScript
// @version      1.0
// @description  try to take over the world!
// @author       You
// @match        https://www.iconfont.cn/manage/*manage_type=myprojects*
// @grant        none
// ==/UserScript==

function addProtocol() {
  const preTags = document.getElementsByTagName("pre");
  const n = preTags.length;
  for (let i = 0; i < n; ++i)
    preTags[i].innerText = preTags[i].innerText.replace(
      /\/\/at.alicdn.com/g,
      "https://at.alicdn.com"
    );
}

(function () {
  "use strict";
  console.log(document.getElementsByClassName("block-bar"));
  const btn = document.createElement("div");
  btn.style.position = "fixed";
  btn.style.top = "35%";
  btn.style.left = "10px";
  btn.style.background = "#4C98F7";
  btn.style.color = "#fff";
  btn.style.height = "50px";
  btn.style.width = "50px";
  btn.style.cursor = "pointer";
  btn.style["line-height"] = "50px";
  btn.style["text-align"] = "center";
  btn.style["border-radius"] = "50px";
  btn.innerText = "HTTP";
  const body = document.getElementsByTagName("body")[0];
  btn.onclick = function () {
    addProtocol();
  };
  body.appendChild(btn);
})();
