import type { Website } from "../websites";

const website: Website = {
  regexp: /link\.zhihu/,
  init: function () {
    const result = /.*link.zhihu.com\/\?target=(.*)/.exec(location.href);
    if (result) {
      const url = decodeURIComponent(result[1]);
      if (url) {
        console.log(url);
        location.href = url;
      }
    }
  },
};

export default website;
