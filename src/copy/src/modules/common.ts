import utils from "../utils";
import { Website } from "../websites";

const website: Website = {
    regexp: new RegExp(
        [
            "commandlinux",
            "cnki",
            "leetcode-cn",
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
        ].join("|")
    ),
    init: function ($) {
        utils.hideButton($);
    },
};

export default website;
