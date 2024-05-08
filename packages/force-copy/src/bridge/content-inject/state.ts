const CI_EXECUTION_TYPE = ["START", "CLOSE"] as const;
export const CI_EXECUTION_ENUM = CI_EXECUTION_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: cur }),
  {} as { [K in typeof CI_EXECUTION_TYPE[number]]: K }
);
export type CIExecutionType = typeof CI_EXECUTION_TYPE[number];
