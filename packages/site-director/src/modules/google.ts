import { Website } from "../websites";

const website: Website = {
  regexp: /google/,
  init: function () {
    const isScholar = window.location.host.startsWith("scholar");
    const selector = isScholar ? "#gs_bdy_ccl .gs_rt a" : "#res a";
    document.addEventListener("DOMContentLoaded", () =>
      document.querySelectorAll(selector).forEach(item => item.setAttribute("target", "_blank"))
    );
  },
};

export default website;
