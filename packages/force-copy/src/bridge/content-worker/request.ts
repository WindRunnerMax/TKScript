const CW_REQUEST_TYPE = ["RELOAD", "SET_BADGE"] as const;
export const CONTENT_TO_WORKER_REQUEST = CW_REQUEST_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__CW__` }),
  {} as { [K in typeof CW_REQUEST_TYPE[number]]: `__${K}__CW__` }
);

export type CWRequestType =
  | {
      type: typeof CONTENT_TO_WORKER_REQUEST.RELOAD;
      payload: null;
    }
  | {
      type: typeof CONTENT_TO_WORKER_REQUEST.SET_BADGE;
      payload: number;
    };
