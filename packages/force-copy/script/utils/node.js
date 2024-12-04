const IS_DEV = process.env.NODE_ENV === "development";
const IS_PROD = process.env.NODE_ENV === "production";
const IS_GECKO = process.env.PLATFORM === "gecko";
const IS_CHROMIUM = process.env.PLATFORM ? process.env.PLATFORM === "chromium" : true;
const CHARTS = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";

exports.IS_DEV = IS_DEV;
exports.IS_PROD = IS_PROD;
exports.IS_GECKO = IS_GECKO;
exports.IS_CHROMIUM = IS_CHROMIUM;

const getUniqueId = (len = 10) => {
  const chars = new Array(len - 1).fill("");
  return (
    CHARTS[Math.floor(Math.random() * 52)] +
    chars.map(() => CHARTS[Math.floor(Math.random() * CHARTS.length)]).join("")
  );
};

const promisify = fn => {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
    });
};

exports.promisify = promisify;
exports.getUniqueId = getUniqueId;
