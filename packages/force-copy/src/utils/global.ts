let env = chrome;

// #IFDEF GECKO
if (typeof browser !== "undefined") {
  env = browser;
}
// #ENDIF

export const cross = env;
