import { CWBridge } from "@/bridge/content-worker";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { Storage } from "laser-utils";

export const initializeWorker = () => {
  Promise.resolve().then(() => {
    const badge = [
      Storage.local.get<boolean>(COPY_TYPE),
      Storage.local.get<boolean>(CONTEXT_MENU_TYPE),
      Storage.local.get<boolean>(KEYBOARD_TYPE),
      Storage.session.get<boolean>(COPY_TYPE),
      Storage.session.get<boolean>(CONTEXT_MENU_TYPE),
      Storage.session.get<boolean>(KEYBOARD_TYPE),
    ].filter(Boolean).length;
    CWBridge.postToWorker({ type: CWBridge.REQUEST.SET_BADGE, payload: badge });
  });
};
