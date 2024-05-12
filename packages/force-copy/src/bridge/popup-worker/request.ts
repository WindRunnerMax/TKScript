import type { EventReflect, Object } from "@/utils/types";

const PW_REQUEST_TYPE = ["RELOAD", "__"] as const;
export const POPUP_TO_WORKER_REQUEST = PW_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__PW__` }),
  {} as { [K in typeof PW_REQUEST_TYPE[number]]: `__${K}__PW__` }
);

export type PWRequestMap = {
  [POPUP_TO_WORKER_REQUEST.RELOAD]: null;
};

export type PWRequestType = Object.Values<
  EventReflect.Map<Object.Values<typeof POPUP_TO_WORKER_REQUEST>, PWRequestMap>
>;

export type PWToWorkerArgs = EventReflect.Array<
  Object.Values<typeof POPUP_TO_WORKER_REQUEST>,
  PWRequestMap
>;
