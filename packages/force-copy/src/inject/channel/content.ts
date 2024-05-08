import type { CIRequestType } from "@/bridge/content-inject";
import { CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject";
import type { WebSite } from "../types/website";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { logger } from "@/utils/logger";
import { DOM_STAGE } from "copy/src/constant/event";
import { CI_EXECUTION_ENUM } from "@/bridge/content-inject/constant";

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
    }
  };
};
