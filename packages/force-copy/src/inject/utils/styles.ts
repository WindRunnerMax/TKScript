export const STYLE_ID = "__FORCE_COPY_STYLE__";

export const COPY_BUTTON_STYLE =
  ".__copy-button {width: 60px; height: 30px; background: #4C98F7;color: #fff;position: absolute;" +
  "z-index: -1000;opacity: 0;display: flex;justify-content: center;align-items: center;border-radius: 3px;" +
  "font-size: 13px;cursor: pointer;transition: opacity 0.3s;} ";

// https://developer.mozilla.org/zh-CN/docs/Web/CSS/user-select
export const AUTO_USER_SELECT =
  "*, html body * :not(input):not(textarea)" +
  "{user-select: auto !important;-webkit-user-select: auto !important;} ";

// https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media
export const ALLOW_PAINT = "@media print{body{display:block !important;}} ";

// https://developer.mozilla.org/en-US/docs/Web/CSS/unset
// https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection
// https://stackoverflow.com/questions/33448213/how-to-reset-background-color-of-selection
export const AUTO_SELECTION =
  ":not(input):not(textarea)::selection {" +
  "  color: inherit !important;" +
  "  background-color: #BEDAFF !important;" +
  "  background-color: highlight !important;" +
  "} " +
  ":not(input):not(textarea)::-moz-selection {" +
  "  color: inherit !important;" +
  "  background-color: #BEDAFF !important;" +
  "  background-color: highlight !important;" +
  "} ";
