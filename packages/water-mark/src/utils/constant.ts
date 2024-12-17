export const FALLBACK_CLASS = "__WATERMARK__";

export const OPACITY_PROPERTY = [
  "opacity: 0 !important;",
  "visibility: hidden !important;",
  "transform: translate(-999999px, -999999px) !important;",
].join("");

export const OPACITY_BACKGROUND_PROPERTY = [
  "background: transparent !important;",
  "background-color: transparent !important;",
  "background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)) !important;",
].join("");

export const NOOP = () => null;
