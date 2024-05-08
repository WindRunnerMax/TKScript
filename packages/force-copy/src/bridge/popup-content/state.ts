const PC_QUERY_STATE_TYPE = [
  "COPY",
  "MENU",
  "KEYBOARD",
  "COPY_ONCE",
  "MENU_ONCE",
  "KEYBOARD_ONCE",
] as const;
export const PC_QUERY_STATE_ENUM = PC_QUERY_STATE_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: cur }),
  {} as { [K in typeof PC_QUERY_STATE_TYPE[number]]: K }
);
export type PCQueryStateType = typeof PC_QUERY_STATE_TYPE[number];
