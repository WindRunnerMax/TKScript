import { CWBridge } from "@/bridge/content-worker";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { storage } from "laser-utils";

export const initializeWorker = () => {
  Promise.resolve().then(() => {
    const badge = [
      storage.local.get<boolean>(COPY_TYPE),
      storage.local.get<boolean>(CONTEXT_MENU_TYPE),
      storage.local.get<boolean>(KEYBOARD_TYPE),
      storage.session.get<boolean>(COPY_TYPE),
      storage.session.get<boolean>(CONTEXT_MENU_TYPE),
      storage.session.get<boolean>(KEYBOARD_TYPE),
    ].filter(Boolean).length;
    CWBridge.postToWorker({ type: CWBridge.REQUEST.SET_BADGE, payload: badge });
  });
};
