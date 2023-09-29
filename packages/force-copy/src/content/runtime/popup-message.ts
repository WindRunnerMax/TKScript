import { QUERY_STATE_TYPE } from "@/bridge/constant";
import {
  PC_REQUEST,
  POPUP_TO_CONTENT_REQUEST,
  POPUP_TO_CONTENT_RESPONSE,
} from "@/bridge/popup-content";
import { CONTEXT_MENU_TYPE, COPY_TYPE, KEYBOARD_TYPE } from "@/utils/constant";
import { storage } from "laser-utils";

export const onPopupMessage = (data: PC_REQUEST) => {
  switch (data.type) {
    case POPUP_TO_CONTENT_REQUEST.COPY_TYPE: {
      if (!data.payload.once) {
        storage.local.set(COPY_TYPE, data.payload.checked);
      } else {
        storage.session.set(COPY_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE: {
      if (!data.payload.once) {
        storage.local.set(KEYBOARD_TYPE, data.payload.checked);
      } else {
        storage.session.set(KEYBOARD_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE: {
      if (!data.payload.once) {
        storage.local.set(CONTEXT_MENU_TYPE, data.payload.checked);
      } else {
        storage.session.set(CONTEXT_MENU_TYPE, data.payload.checked);
      }
      break;
    }
    case POPUP_TO_CONTENT_REQUEST.QUERY_STATE: {
      const STATE_MAP = {
        [QUERY_STATE_TYPE.COPY]: { key: COPY_TYPE },
        [QUERY_STATE_TYPE.MENU]: { key: CONTEXT_MENU_TYPE },
        [QUERY_STATE_TYPE.KEYDOWN]: { key: KEYBOARD_TYPE },
      };
      for (const [key, value] of Object.entries(STATE_MAP)) {
        if (key === data.payload.type)
          return {
            type: POPUP_TO_CONTENT_RESPONSE.STATE,
            payload: data.payload.once
              ? storage.session.get<boolean>(value.key)
              : storage.local.get<boolean>(value.key),
          };
      }
    }
  }
};
