import { Website } from "../websites";
import utils from "./utils";

const website: Website = {
    regexp: /zhihu/,
    init: function () {
        document.body.addEventListener(
            "click",
            e => {
                let cur = e.target as HTMLElement & { href?: string };
                const regexp = /.*link.zhihu.com\/\?target=(.*)/;
                for (let i = 0; i < 5; ++i) {
                    if (!cur) break;
                    if (cur.nodeName === "A") {
                        if (regexp.test(cur.href)) {
                            const url = decodeURIComponent(
                                /.*link.zhihu.com\/\?target=(.*)/.exec(cur.href)[1]
                            );
                            console.log(url);
                            window.open(url);
                            utils.directByBlockEvent(e);
                        }
                        break;
                    }
                    cur = cur.parentNode as HTMLElement & { href?: string };
                }
            },
            true
        );
    },
};

export default website;
