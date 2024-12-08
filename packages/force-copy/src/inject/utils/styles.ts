export const STYLE_ID = "__FORCE_COPY_STYLE__";

export const AUTO_USER_SELECT =
  "*{user-select: auto !important;-webkit-user-select: auto !important;} ";

export const ALLOW_PAINT = "@media print{body{display:block !important;}} ";

export const COPY_BUTTON_STYLE =
  ".__copy-button {width: 60px; height: 30px; background: #4C98F7;color: #fff;position: absolute;" +
  "z-index: -1000;opacity: 0;display: flex;justify-content: center;align-items: center;border-radius: 3px;" +
  "font-size: 13px;cursor: pointer;transition: opacity 0.3s;} ";

export const AUTO_SELECTION =
  ":not(input):not(textarea)::selection {" +
  "  background-color: #BEDAFF !important;" +
  "  background-color: highlight !important;" +
  "} " +
  ":not(input):not(textarea)::-moz-selection {" +
  "  background-color: #BEDAFF !important;" +
  "  background-color: highlight !important;" +
  "} ";
