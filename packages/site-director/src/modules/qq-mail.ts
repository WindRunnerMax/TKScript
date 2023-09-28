import { Website } from "../websites";

const website: Website = {
  regexp: /mail\.qq/,
  init: function () {
    const result = new URL(location.href).searchParams.get("gourl");
    if (result) {
      location.href = decodeURIComponent(result);
    }
  },
};

export default website;
