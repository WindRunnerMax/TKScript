import type { WebSite } from "../types/website";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { logger } from "@/utils/logger";
import { DOM_STAGE } from "copy/src/constant/event";
import type { CIRequestType } from "@/bridge/content-inject/request";
import { CI_EXECUTION_ENUM, CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject/request";
import { CIBridge } from "@/bridge/content-inject";
import { EventBus, EVENTS_ENUM } from "../utils/bus";
import { stopNativePropagation } from "../utils/events";

export const onContentMessage = (handler: WebSite) => {
  return (data: CIRequestType) => {
    logger.info("Inject Receive Content Message", location.host, data);
    switch (data.type) {
      case CONTENT_TO_INJECT_REQUEST.COPY_TYPE: {
        data.payload === CI_EXECUTION_ENUM.START
          ? handler.start(COPY_TYPE, DOM_STAGE.END)
          : handler.close(COPY_TYPE);
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE: {
        data.payload === CI_EXECUTION_ENUM.START
          ? handler.start(KEYBOARD_TYPE, DOM_STAGE.END)
          : handler.close(KEYBOARD_TYPE);
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE: {
        data.payload === CI_EXECUTION_ENUM.START
          ? handler.start(CONTEXT_MENU_TYPE, DOM_STAGE.END)
          : handler.close(CONTEXT_MENU_TYPE);
        break;
      }
      case CIBridge.REQUEST.DEBUG_MOUSE_EVENT: {
        EventBus.on(EVENTS_ENUM.MOUSE_DOWN_CAPTURE, stopNativePropagation);
        EventBus.on(EVENTS_ENUM.MOUSE_UP_CAPTURE, stopNativePropagation);
        EventBus.on(EVENTS_ENUM.MOUSE_MOVE_CAPTURE, stopNativePropagation);
        EventBus.on(EVENTS_ENUM.TOUCH_START_CAPTURE, stopNativePropagation);
        EventBus.on(EVENTS_ENUM.TOUCH_MOVE_CAPTURE, stopNativePropagation);
        EventBus.on(EVENTS_ENUM.TOUCH_END_CAPTURE, stopNativePropagation);
        break;
      }
      case CIBridge.REQUEST.DEBUG_FOCUS_EVENT: {
        EventBus.on(EVENTS_ENUM.FOCUS_CAPTURE, stopNativePropagation);
        EventBus.on(EVENTS_ENUM.BLUR_CAPTURE, stopNativePropagation);
        break;
      }
      case CIBridge.REQUEST.DEBUG_EDITABLE: {
        document.body.contentEditable = "true";
        break;
      }
    }
  };
};
