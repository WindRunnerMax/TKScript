import type { Reflex } from "@/utils/types";
import { MARK } from "./constant";

const PW_REQUEST_TYPE = ["RELOAD", "__"] as const;
export const POPUP_TO_WORKER_REQUEST = PW_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__${MARK}__` }),
  {} as { [K in typeof PW_REQUEST_TYPE[number]]: `__${K}__${typeof MARK}__` }
);

export type PWRequestMap = {
  [POPUP_TO_WORKER_REQUEST.RELOAD]: null;
  [POPUP_TO_WORKER_REQUEST.__]: null;
};

export type PWRequestType = Reflex.Tuple<PWRequestMap>;

export type PWRequestArgs = Reflex.Array<PWRequestMap>;
