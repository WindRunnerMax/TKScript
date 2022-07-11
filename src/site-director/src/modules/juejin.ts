import { Website } from "../websites";

const website: Website = {
    regexp: /link\.juejin/,
    init: function () {
        const result = new URL(location.href).searchParams.get("target");
        if (result) {
            location.href = decodeURIComponent(result);
        }
    },
};

export default website;
