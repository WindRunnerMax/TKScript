import { Website } from "../websites";

const website: Website = {
    regexp: /csdn/,
    init: function ($) {
        $("#article_content  a:not([name])").each((i, v) => {
            const el = v as HTMLElement & { href?: string };
            const a = document.createElement("a");
            a.innerHTML = `<span onclick="window.open('${el.href}')">${el.innerText}</>`;
            v.replaceWith(a);
        });
    },
};

export default website;
