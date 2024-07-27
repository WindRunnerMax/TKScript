import type { State } from "./types/state";
import { Storage } from "laser-utils";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { websites } from "./modules";
import { initBaseEvents } from "./utils/events";
import { CIBridge } from "@/bridge/content-inject";
import { onContentMessage } from "./channel/content";
import { LOG_LEVEL, logger } from "@/utils/logger";
import { DOM_STAGE } from "copy/src/constant/event";

(async (): Promise<void> => {
  if (__DEV__) {
    logger.setLevel(LOG_LEVEL.INFO);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window[process.env.EVENT_TYPE]) {
    logger.info("Inject Script Already Loaded");
    return void 0;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window[process.env.EVENT_TYPE] = true;
  logger.info("Inject Script Loaded");
  // 初始化事件
  initBaseEvents();
  // 初始化状态
  const state: State = {
    COPY: !!Storage.local.get<boolean>(COPY_TYPE) || !!Storage.session.get<boolean>(COPY_TYPE),
    KEYBOARD:
      !!Storage.local.get<boolean>(KEYBOARD_TYPE) || !!Storage.session.get<boolean>(KEYBOARD_TYPE),
    CONTEXT_MENU:
      !!Storage.local.get<boolean>(CONTEXT_MENU_TYPE) ||
      !!Storage.session.get<boolean>(CONTEXT_MENU_TYPE),
  };
  const handler = websites.find(item => item.regexp.test(location.href)) || websites.slice(-1)[0];
  if (!handler) return void 0;
  handler.init && handler.init(state);
  state.COPY && handler.start(COPY_TYPE, DOM_STAGE.START);
  state.KEYBOARD && handler.start(KEYBOARD_TYPE, DOM_STAGE.START);
  state.CONTEXT_MENU && handler.start(CONTEXT_MENU_TYPE, DOM_STAGE.START);
  CIBridge.onContentMessage(onContentMessage(handler));
})();
