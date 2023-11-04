// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

const __URL_MATCH__ = ["https://*/*", "http://*/*", "file://*/*"];

// Chromium
const __MANIFEST__: Record<string, unknown> = {
  manifest_version: 3,
  name: "Force Copy",
  version: "0.0.0",
  description: "Force Copy Everything",
  default_locale: "en",
  icons: {
    32: "./static/favicon.128.png",
    96: "./static/favicon.128.png",
    128: "./static/favicon.128.png",
  },
  action: {
    default_popup: "popup.html",
    default_icon: "./static/favicon.128.png",
  },
  content_scripts: [
    {
      matches: [...__URL_MATCH__],
      js: ["./content.js"],
      run_at: "document_start",
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: ["static/*", process.env.INJECT_FILE + ".js"],
      matches: ["<all_urls>"],
    },
  ],
  background: {
    service_worker: "worker.js",
  },
  host_permissions: [...__URL_MATCH__],
  permissions: ["activeTab", "tabs", "scripting"],
  minimum_chrome_version: "88.0",
};

// Gecko
if (process.env.PLATFORM === "gecko") {
  __MANIFEST__.manifest_version = 2;
  __MANIFEST__.browser_action = __MANIFEST__.action;
  __MANIFEST__.content_scripts = [
    {
      matches: [...__URL_MATCH__],
      js: [process.env.INJECT_FILE + ".js", "./content.js"],
      run_at: "document_start",
      all_frames: true,
    },
  ];
  __MANIFEST__.background = {
    scripts: [__MANIFEST__.background.service_worker],
  };
  __MANIFEST__.permissions = ["activeTab", "tabs", ...__URL_MATCH__];
  __MANIFEST__.browser_specific_settings = {
    gecko: { strict_min_version: "91.1.0" },
    gecko_android: { strict_min_version: "91.1.0" },
  };

  delete __MANIFEST__.action;
  delete __MANIFEST__.host_permissions;
  delete __MANIFEST__.minimum_chrome_version;
  delete __MANIFEST__.web_accessible_resources;
}

module.exports = __MANIFEST__;
