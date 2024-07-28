import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { isInIframe } from "@/utils/is";
import { logger } from "@/utils/logger";
import { Storage } from "laser-utils";
import { CI_EXECUTION_ENUM } from "@/bridge/content-inject/request";
import type { PCRequestType } from "@/bridge/popup-content/request";
import { POPUP_TO_CONTENT_REQUEST } from "@/bridge/popup-content/request";
import { CIBridge } from "@/bridge/content-inject";
import { CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject/request";
import { PC_QUERY_STATE_ENUM } from "@/bridge/popup-content/response";
import { PCBridge } from "@/bridge/popup-content";

export const onPopupMessage = (data: PCRequestType) => {
  logger.info("Content Receive Popup Message", location.host, data);
  switch (data.type) {
    case POPUP_TO_CONTENT_REQUEST.COPY_TYPE: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.COPY_TYPE,
        payload: data.payload.checked ? CI_EXECUTION_ENUM.START : CI_EXECUTION_ENUM.CLOSE,
      });
      if (!data.payload.once) {
        Storage.local.set(COPY_TYPE, data.payload.checked);
      } else {
        Storage.session.set(COPY_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE,
        payload: data.payload.checked ? CI_EXECUTION_ENUM.START : CI_EXECUTION_ENUM.CLOSE,
      });
      if (!data.payload.once) {
        Storage.local.set(KEYBOARD_TYPE, data.payload.checked);
      } else {
        Storage.session.set(KEYBOARD_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE: {
      CIBridge.postToInject({
        type: CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE,
        payload: data.payload.checked ? CI_EXECUTION_ENUM.START : CI_EXECUTION_ENUM.CLOSE,
      });
      if (!data.payload.once) {
        Storage.local.set(CONTEXT_MENU_TYPE, data.payload.checked);
      } else {
        Storage.session.set(CONTEXT_MENU_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.QUERY_STATE: {
      if (isInIframe) break;
      return {
        type: data.type,
        payload: {
          [PC_QUERY_STATE_ENUM.COPY]: !!Storage.local.get<boolean>(COPY_TYPE),
          [PC_QUERY_STATE_ENUM.MENU]: !!Storage.local.get<boolean>(CONTEXT_MENU_TYPE),
          [PC_QUERY_STATE_ENUM.KEYBOARD]: !!Storage.local.get<boolean>(KEYBOARD_TYPE),
          [PC_QUERY_STATE_ENUM.COPY_ONCE]: !!Storage.session.get<boolean>(COPY_TYPE),
          [PC_QUERY_STATE_ENUM.MENU_ONCE]: !!Storage.session.get<boolean>(CONTEXT_MENU_TYPE),
          [PC_QUERY_STATE_ENUM.KEYBOARD_ONCE]: !!Storage.session.get<boolean>(KEYBOARD_TYPE),
        },
      };
    }
    case PCBridge.REQUEST.DEBUG_MOUSE_EVENT: {
      CIBridge.postToInject({
        type: CIBridge.REQUEST.DEBUG_MOUSE_EVENT,
        payload: null,
      });
      break;
    }
    case PCBridge.REQUEST.DEBUG_FOCUS_EVENT: {
      CIBridge.postToInject({
        type: CIBridge.REQUEST.DEBUG_FOCUS_EVENT,
        payload: null,
      });
      break;
    }
    case PCBridge.REQUEST.DEBUG_EDITABLE: {
      CIBridge.postToInject({
        type: CIBridge.REQUEST.DEBUG_EDITABLE,
        payload: null,
      });
      break;
    }
  }
};
