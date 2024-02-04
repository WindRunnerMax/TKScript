import utils from "../utils/event";
import type { Website } from "../websites";

const website: Website = {
  regexp: new RegExp(
    [
      "commandlinux",
      "cnki",
      "ruiwen",
      "oh100",
      "fwsir",
      "wenxm",
      "unjs",
      "ahsrst",
      "yjbys",
      "360doc",
      "850500",
      "jianbiaoku",
      "kt250",
      "kejudati",
      "baibeike",
      "yuque",
      "cnrencai",
      "kodiplayer",
      "tongxiehui",
      "ndPureView",
      "jianshu",
      "linovelib",
      "chazidian",
      "juejin",
      "zgbk",
      "wenmi",
      "yuedu\\.baidu",
      "inrrp",
      "shubaoc",
      "51cto",
      "ximalaya",
      "xiexiebang",
      "ddwk8",
      "php\\.cn",
      "fanqienovel\\.com/reader",
      "cooco\\.net\\.cn",
      "mobiletrain",
      "xiangqiqipu",
      "m\\.163\\.com",
      "aipiaxi",
      "wenku\\.csdn\\.net",
    ].join("|")
  ),
  init: function () {
    utils.hideButton();
    utils.enableUserSelectByCSS();
    utils.enableOnCopyByCapture();
  },
};

export default website;
