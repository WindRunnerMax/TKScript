export type Manifest = {
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json
  manifest_version: number;
  name: string;
  version: string;
  description: string;
  default_locale: string;
  icons: Record<number, string>;
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/content_scripts
  content_scripts?: {
    matches: string[];
    js: string[];
    run_at: string;
    all_frames: boolean;
  }[];
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/permissions
  permissions: string[];
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/background
  background: {
    service_worker?: string;
    scripts?: string[];
  };
  // ====== Chromium ======
  action?: {
    default_popup: string;
    default_icon: string;
  };
  web_accessible_resources?: {
    resources: string[];
    matches: string[];
  }[];
  host_permissions?: string[];
  minimum_chrome_version?: string;
  // ======================
  // ====== Gecko ======
  browser_action?: {
    default_popup: string;
    default_icon: string;
  };
  browser_specific_settings?: {
    gecko: {
      strict_min_version: string;
    };
    gecko_android: {
      strict_min_version: string;
    };
  };
  // ===================
};

// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Match_patterns
export const __URL_MATCH__ = ["https://*/*", "http://*/*", "file://*/*"];
