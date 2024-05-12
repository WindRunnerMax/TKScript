import type { EventReflect } from "@/utils/types";
import { MARK } from "./constant";

const WC_REQUEST_TYPE = ["DATA", "__"] as const;
export const POPUP_TO_CONTENT_REQUEST = WC_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {} as { [K in typeof WC_REQUEST_TYPE[number]]: `__${K}__${typeof MARK}__` }
);

type EventMap = {
  [POPUP_TO_CONTENT_REQUEST.DATA]: string;
};

export type WCRequestType = EventReflect.Tuple<typeof POPUP_TO_CONTENT_REQUEST, EventMap>;
