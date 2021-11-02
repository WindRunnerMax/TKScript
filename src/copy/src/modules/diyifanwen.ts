import { Website } from "../websites";

const website: Website = {
    regexp: /diyifanwen/,
    init: function () {
        setTimeout(() => {
            document.oncopy = e => e.stopPropagation();
            document.body.oncopy = e => e.stopPropagation();
        }, 1000);
    },
};

export default website;
