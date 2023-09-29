const CHARTS = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm0123456789";
const getUniqueId = (len = 10) => {
  const chars = new Array(len - 1).fill("");
  return (
    CHARTS[Math.floor(Math.random() * 52)] +
    chars.map(() => CHARTS[Math.floor(Math.random() * CHARTS.length)]).join("")
  );
};

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

exports.isDev = isDev;
exports.isProd = isProd;
exports.getUniqueId = getUniqueId;
