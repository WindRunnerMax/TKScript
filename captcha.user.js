// ==UserScript==
// @name         SWVerifyCode
// @namespace    https://github.com/WindrunnerMax/TKScript
// @version      1.1
// @description  try to take over the world!
// @author       Czy
// @match        *://jwgl.sdust.edu.cn/
// @match        *://jwgl.sdust.edu.cn/jsxsd/
// @grant        none
// ==/UserScript==

/**
 * 配置账号密码信息(选填)
 */
const username = ""; //账号
const password = ""; //密码
const autologin = false; //自动登录

const height = 22;
const width = 62;
const rgbThres = 150;
const charMap = {
  1: "111100111110000111110000111111100111111100111111100111111100111111100111111100111111100111110000001110000001",
  2: "100000111000000011111111001111111001111111001111110011111000111110011111100111111001111111000000001000000001",
  3: "100000111000000011111110001111111001111110011110000111110000011111110001111111001111110001100000011100000111",
  b: "001111111001111111001111111001000011000000001000111000001111100001111100001111100000111000000000001001000011",
  c: "111111111111111111111111111110000011100000011000111111001111111001111111001111111000111111100000011110000011",
  m: "111111111111111111111111111001000011000000000000111000001111001001111001001111001001111001001111001001111001",
  n: "111111111111111111111111111001100001001000000000011100000111100001111100001111100001111100001111100001111100",
  v: "111111111111111111111111111111111011001110011001110011001110011100100111100100111100100111110001111110001111",
  x: "111111111111111111111111111001110011001110011100100111110001111110001111110001111100100111001110011001110011",
  z: "111111111111111111111111111000000011000000011111100111111001111110011111100111111001111111000000011000000011",
};

function binaryImage(ctx) {
  const imageData = ctx.getImageData(0, 0, width, height).data;
  const imgArr = [];
  for (let x = 0; x < width; ++x) {
    for (let y = 0; y < height; ++y) {
      if (!imgArr[y]) imgArr[y] = [];
      if (x === 0 || y === 0 || x === width - 1 || y === height - 1) {
        imgArr[y][x] = 1;
        continue;
      }
      const i = (y * width + x) * 4;
      if (imageData[i] < rgbThres && imageData[i + 1] < rgbThres && imageData[i + 2] < rgbThres) {
        imgArr[y][x] = 0;
      } else {
        imgArr[y][x] = 1;
      }
    }
  }
  return imgArr;
}

function removeByLine(imgArr) {
  const xCount = imgArr[0].length;
  const yCount = imgArr.length;
  for (let i = 1; i < yCount - 1; ++i) {
    for (let k = 1; k < xCount - 1; ++k) {
      if (imgArr[i][k] === 0) {
        const countOne = imgArr[i][k - 1] + imgArr[i][k + 1] + imgArr[i - 1][k] + imgArr[i + 1][k];
        if (countOne > 2) imgArr[i][k] = 1;
      }
    }
  }
  return imgArr;
}

function cutImg(imgArr, arrX, arrY, n) {
  const imgArrArr = [];
  for (let i = 0; i < n; ++i) {
    const unitImg = [];
    for (let j = arrY[i][0]; j < arrY[i][1]; ++j) {
      if (!unitImg[j]) unitImg[j - arrY[i][0]] = [];
      for (let k = arrX[i][0]; k < arrX[i][1]; ++k) {
        unitImg[j - arrY[i][0]][k - arrX[i][0]] = imgArr[j][k];
      }
    }
    imgArrArr.push(unitImg);
  }
  return imgArrArr;
}

function getString(imgArr) {
  let s = "";
  imgArr.forEach(vx => {
    vx.forEach(vy => {
      s += vy;
    });
  });
  return s;
}

function comparedText(s1, s2) {
  let percent = 0;
  const n = s1.length;
  for (let i = 0; i < n; ++i) s1[i] === s2[i] ? ++percent : "";
  return percent;
}

function matchCode(imgArrArr) {
  let record = "";
  imgArrArr.forEach(imgArr => {
    let maxMatch = 0;
    let tempRecord = "";
    for (const char in charMap) {
      const percent = comparedText(getString(imgArr), charMap[char]);
      if (percent > maxMatch) {
        maxMatch = percent;
        tempRecord = char;
      }
    }
    record += tempRecord;
  });
  return record;
}

function showImg(imgArr) {
  let s = "";
  imgArr.forEach(vx => {
    vx.forEach(vy => {
      s += vy;
    });
    s += "\n";
  });
  console.log(s);
}

function main() {
  const img = document.getElementById("SafeCodeImg");
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  let imgArr = binaryImage(ctx);
  imgArr = removeByLine(imgArr);
  const imgArrArr = cutImg(
    imgArr,
    [
      [4, 13],
      [14, 23],
      [24, 33],
      [34, 43],
    ],
    [
      [4, 16],
      [4, 16],
      [4, 16],
      [4, 16],
    ],
    4
  );
  showImg(imgArr);
  const result = matchCode(imgArrArr);
  console.log("识别为：", result);
  document.getElementById("RANDOMCODE").value = result;
  document.getElementById("userAccount").value = username;
  document.getElementById("userPassword").value = password;
  if (autologin) document.getElementById("btnSubmit").click();
}

(function () {
  "use strict";
  const img = document.getElementById("SafeCodeImg");
  img.onload = function () {
    main();
  };
})();
