import { reloadApp } from "@/utils/reload";

if (process.env.NODE_ENV === "development") {
  chrome.runtime.onMessage.addListener(request => {
    reloadApp(request);
  });
}
