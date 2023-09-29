const PC_QUERY_STATE_KEY = ["COPY", "MENU", "KEYBOARD"] as const;
export const PC_QUERY_STATE_TYPE = PC_QUERY_STATE_KEY.reduce(
  (acc, cur) => ({ ...acc, [cur]: cur }),
  {} as { [K in typeof PC_QUERY_STATE_KEY[number]]: K }
);
export type PC_QUERY_STATE_KEY_TYPE = typeof PC_QUERY_STATE_KEY[number];

const CI_EXECUTION_KEY = ["START", "CLOSE"] as const;
export const CI_EXECUTION_TYPE = CI_EXECUTION_KEY.reduce(
  (acc, cur) => ({ ...acc, [cur]: cur }),
  {} as { [K in typeof CI_EXECUTION_KEY[number]]: K }
);
export type CI_EXECUTION_KEY_TYPE = typeof CI_EXECUTION_KEY[number];
