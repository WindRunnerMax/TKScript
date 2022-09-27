import utils from "../utils/utils";
import { Website } from "../websites";

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
        ].join("|")
    ),
    init: function () {
        utils.hideButton();
        utils.enableUserSelectByCSS();
        utils.enableOnCopyByCapture();
    },
};

export default website;
