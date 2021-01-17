
const website = {
    regexp: /zhihu/,
    init: function($) {
        window.onload = () => {
            $("a").each((i, v) => {
                const regexp = /https:\/\/link.zhihu.com\/\?target=(.*)/;
                if(v.href.match(regexp)) {
                    v.href = v.href.replace(regexp, ($0, $1) => decodeURIComponent($1));
                }
            });
        }
    }
}

export default website;

