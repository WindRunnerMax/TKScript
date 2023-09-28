import {
  POPUP_CONTENT_ACTION,
  PopupContentBridge,
  QUERY_STATE_KEY,
  PopupContentAction,
  POPUP_CONTENT_RTN,
} from "@/content/bridge/popup";
import {
  STORAGE_KEY_PREFIX,
  disableContextMenuHook,
  disableCopyHook,
  disableKeydownHook,
  enableContextMenuHook,
  enableCopyHook,
  enableKeydownHook,
} from "@/inject/utils/event";

const ACTION = POPUP_CONTENT_ACTION;

let DOMLoaded = false;
const collector: (() => void)[] = [];

// Equivalent to content_scripts document_end
window.addEventListener("DOMContentLoaded", () => {
  DOMLoaded = true;
  collector.forEach(fn => fn());
});

// // inject inject.js
// const script = document.createElement("script");
// script.src = chrome.runtime.getURL("inject.js");
// script.type = "text/javascript";
// script.onload = () => script.remove();
// (document.head || document.body).appendChild(script);

const withDOMReady = (fn: () => void) => {
  if (DOMLoaded) {
    fn();
  } else {
    collector.push(fn);
  }
};

const onMessage = (data: PopupContentAction) => {
  switch (data.type) {
    case ACTION.COPY: {
      if (data.payload.checked) withDOMReady(enableCopyHook);
      else withDOMReady(disableCopyHook);
      const key = STORAGE_KEY_PREFIX + ACTION.COPY;
      if (!data.payload.once) {
        localStorage.setItem(key, data.payload.checked ? "true" : "");
      } else {
        sessionStorage.setItem(key, data.payload.checked ? "true" : "");
      }
      break;
    }
    case ACTION.MENU: {
      if (data.payload.checked) enableContextMenuHook();
      else disableContextMenuHook();
      const key = STORAGE_KEY_PREFIX + ACTION.MENU;
      if (!data.payload.once) {
        localStorage.setItem(key, data.payload.checked ? "true" : "");
      } else {
        sessionStorage.setItem(key, data.payload.checked ? "true" : "");
      }
      break;
    }
    case ACTION.KEYDOWN: {
      if (data.payload.checked) enableKeydownHook();
      else disableKeydownHook();
      const key = STORAGE_KEY_PREFIX + ACTION.KEYDOWN;
      if (!data.payload.once) {
        localStorage.setItem(key, data.payload.checked ? "true" : "");
      } else {
        sessionStorage.setItem(key, data.payload.checked ? "true" : "");
      }
      break;
    }
    case ACTION.QUERY_STATE: {
      const STATE_MAP = {
        [QUERY_STATE_KEY.STORAGE_COPY]: { key: ACTION.COPY, storage: localStorage },
        [QUERY_STATE_KEY.STORAGE_MENU]: { key: ACTION.MENU, storage: localStorage },
        [QUERY_STATE_KEY.STORAGE_KEYDOWN]: { key: ACTION.KEYDOWN, storage: localStorage },
        [QUERY_STATE_KEY.SESSION_COPY]: { key: ACTION.COPY, storage: sessionStorage },
        [QUERY_STATE_KEY.SESSION_MENU]: { key: ACTION.MENU, storage: sessionStorage },
        [QUERY_STATE_KEY.SESSION_KEYDOWN]: { key: ACTION.KEYDOWN, storage: sessionStorage },
      };
      for (const [key, value] of Object.entries(STATE_MAP)) {
        if (key === data.payload)
          return {
            type: POPUP_CONTENT_RTN.STATE,
            payload: !!value.storage[STORAGE_KEY_PREFIX + value.key],
          };
      }
    }
  }
};

PopupContentBridge.onMessage(onMessage);

if (
  localStorage.getItem(STORAGE_KEY_PREFIX + ACTION.COPY) ||
  sessionStorage.getItem(STORAGE_KEY_PREFIX + ACTION.COPY)
) {
  withDOMReady(enableCopyHook);
}
if (
  localStorage.getItem(STORAGE_KEY_PREFIX + ACTION.MENU) ||
  sessionStorage.getItem(STORAGE_KEY_PREFIX + ACTION.MENU)
) {
  enableContextMenuHook();
}
if (
  localStorage.getItem(STORAGE_KEY_PREFIX + ACTION.KEYDOWN) ||
  sessionStorage.getItem(STORAGE_KEY_PREFIX + ACTION.KEYDOWN)
) {
  enableKeydownHook();
}
