import { cross } from "@/utils/global";

export const setBadge = (checked: boolean) => {
  cross.tabs
    .query({ active: true, currentWindow: true })
    .then(tabs => {
      const tab = tabs[0];
      const tabId = tab && tab.id;
      return tabId;
    })
    .then(tabId => {
      if (tabId) {
        cross.action.getBadgeText({ tabId }).then(text => {
          const badge = Number(text) || 0;
          const next = badge + (checked ? 1 : -1);
          cross.action.setBadgeText({ text: next <= 0 ? "" : String(next), tabId });
          cross.action.setBadgeBackgroundColor({ color: "#4e5969", tabId });
        });
      }
    });
};
