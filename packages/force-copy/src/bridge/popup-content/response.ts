import type { PCQueryStateType } from "./state";

const PC_RESPONSE_TYPE = ["STATE", "PLACE_HOLDER"] as const;
export const POPUP_TO_CONTENT_RESPONSE = PC_RESPONSE_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__PC__` }),
  {} as { [K in typeof PC_RESPONSE_TYPE[number]]: `__${K}__PC__` }
);

export type PCResponseType = {
  type: typeof POPUP_TO_CONTENT_RESPONSE.STATE;
  payload: { [K in PCQueryStateType]: boolean };
};
