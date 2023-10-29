import { cross } from "@/utils/global";

export const cipherBadgeNumber = (checked: boolean) => {
  cross.tabs
    .query({ active: true, currentWindow: true })
    .then(tabs => {
      const tab = tabs[0];
      const tabId = tab && tab.id;
      return tabId;
    })
    .then(tabId => {
      if (tabId) {
        const action = process.env.PLATFORM === "chromium" ? cross.action : cross.browserAction;
        action.getBadgeText({ tabId }).then(text => {
          const badge = Number(text) || 0;
          const next = badge + (checked ? 1 : -1);
          action.setBadgeText({ text: next <= 0 ? "" : String(next), tabId });
          action.setBadgeBackgroundColor({ color: "#4e5969", tabId });
        });
      }
    });
};
