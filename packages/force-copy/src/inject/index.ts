import { State } from "./types/state";
import { storage } from "laser-utils";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { websites } from "./modules";
import { initBaseEvents } from "./utils/events";
import { CIBridge } from "@/bridge/content-inject";
import { onContentMessage } from "./utils/content-msg";

(async (): Promise<void> => {
  initBaseEvents();
  const state: State = {
    COPY: !!storage.local.get<boolean>(COPY_TYPE) || !!storage.session.get<boolean>(COPY_TYPE),
    KEYBOARD:
      !!storage.local.get<boolean>(KEYBOARD_TYPE) || !!storage.session.get<boolean>(KEYBOARD_TYPE),
    CONTEXT_MENU:
      !!storage.local.get<boolean>(CONTEXT_MENU_TYPE) ||
      !!storage.session.get<boolean>(CONTEXT_MENU_TYPE),
  };
  const handler = websites.find(item => item.regexp.test(location.href)) || websites.slice(-1)[0];
  if (!handler) return void 0;
  handler.init && handler.init(state);
  state.COPY && handler.start(COPY_TYPE);
  state.KEYBOARD && handler.start(KEYBOARD_TYPE);
  state.CONTEXT_MENU && handler.start(CONTEXT_MENU_TYPE);
  CIBridge.onContentMessage(onContentMessage(handler));
})();
