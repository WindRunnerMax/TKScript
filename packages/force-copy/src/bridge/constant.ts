const QUERY_STATE_KEY = ["COPY", "MENU", "KEYDOWN"] as const;
export const QUERY_STATE_TYPE = QUERY_STATE_KEY.reduce(
  (acc, cur) => ({ ...acc, [cur]: cur }),
  {} as { [K in typeof QUERY_STATE_KEY[number]]: K }
);
export type QUERY_STATE_KEY_TYPE = typeof QUERY_STATE_KEY[number];
