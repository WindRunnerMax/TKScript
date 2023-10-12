// Chromium
const MANIFEST: Record<string, unknown> = {
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
      matches: ["<all_urls>"],
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
  permissions: ["activeTab"],
};

// Gecko
if (process.env.PLATFORM === "gecko") {
  MANIFEST.manifest_version = 2;
  MANIFEST.browser_action = MANIFEST.action;
  MANIFEST.browser_specific_settings = {
    gecko: {
      strict_min_version: "91.1.0",
    },
    gecko_android: {
      strict_min_version: "91.1.0",
    },
  };

  delete MANIFEST.action;
  delete MANIFEST.background;
  delete MANIFEST.permissions;
  delete MANIFEST.web_accessible_resources;
}

module.exports = MANIFEST;
