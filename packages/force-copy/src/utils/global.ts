let env = chrome;

if (process.env.PLATFORM === "gecko" && typeof browser !== "undefined") {
  env = browser;
}

export const cross = env;
