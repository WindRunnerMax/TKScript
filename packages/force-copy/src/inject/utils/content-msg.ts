import { CI_REQUEST, CONTENT_TO_INJECT_REQUEST } from "@/bridge/content-inject";
import { WebSite } from "../types/website";
import { CI_EXECUTION_TYPE } from "@/bridge/constant";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { logger } from "@/utils/logger";

export const onContentMessage = (handler: WebSite) => {
  return (data: CI_REQUEST) => {
    logger.info("Inject Receive Content Message", location.host, data);
    switch (data.type) {
      case CONTENT_TO_INJECT_REQUEST.COPY_TYPE: {
        data.payload === CI_EXECUTION_TYPE.START
          ? handler.start(COPY_TYPE)
          : handler.close(COPY_TYPE);
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.KEYBOARD_TYPE: {
        data.payload === CI_EXECUTION_TYPE.START
          ? handler.start(KEYBOARD_TYPE)
          : handler.close(KEYBOARD_TYPE);
        break;
      }
      case CONTENT_TO_INJECT_REQUEST.CONTEXT_MENU_TYPE: {
        data.payload === CI_EXECUTION_TYPE.START
          ? handler.start(CONTEXT_MENU_TYPE)
          : handler.close(CONTEXT_MENU_TYPE);
        break;
      }
    }
  };
};
