import { CI_EXECUTION_TYPE, PC_QUERY_STATE_TYPE } from "@/bridge/constant";
import { CIBridge, CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject";
import { PC_REQUEST, POPUP_TO_CONTENT_REQUEST } from "@/bridge/popup-content";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { logger } from "@/utils/logger";
import { storage } from "laser-utils";

export const onPopupMessage = (data: PC_REQUEST) => {
  logger.info("Content Receive Popup Message", location.host, data);
  switch (data.type) {
    case POPUP_TO_CONTENT_REQUEST.COPY_TYPE: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.COPY_TYPE,
        payload: data.payload.checked ? CI_EXECUTION_TYPE.START : CI_EXECUTION_TYPE.CLOSE,
      });
      if (!data.payload.once) {
        storage.local.set(COPY_TYPE, data.payload.checked);
      } else {
        storage.session.set(COPY_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE,
        payload: data.payload.checked ? CI_EXECUTION_TYPE.START : CI_EXECUTION_TYPE.CLOSE,
      });
      if (!data.payload.once) {
        storage.local.set(KEYBOARD_TYPE, data.payload.checked);
      } else {
        storage.session.set(KEYBOARD_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE,
        payload: data.payload.checked ? CI_EXECUTION_TYPE.START : CI_EXECUTION_TYPE.CLOSE,
      });
      if (!data.payload.once) {
        storage.local.set(CONTEXT_MENU_TYPE, data.payload.checked);
      } else {
        storage.session.set(CONTEXT_MENU_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.QUERY_STATE: {
      return {
        [PC_QUERY_STATE_TYPE.COPY]: storage.local.get<boolean>(COPY_TYPE),
        [PC_QUERY_STATE_TYPE.MENU]: storage.local.get<boolean>(CONTEXT_MENU_TYPE),
        [PC_QUERY_STATE_TYPE.KEYBOARD]: storage.local.get<boolean>(KEYBOARD_TYPE),
        [PC_QUERY_STATE_TYPE.COPY_ONCE]: storage.session.get<boolean>(COPY_TYPE),
        [PC_QUERY_STATE_TYPE.MENU_ONCE]: storage.session.get<boolean>(CONTEXT_MENU_TYPE),
        [PC_QUERY_STATE_TYPE.KEYBOARD_ONCE]: storage.session.get<boolean>(KEYBOARD_TYPE),
      };
    }
  }
};
