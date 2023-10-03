export type ArrayValues<T extends Array<unknown>> = T[number];
export type RecordKeys<T extends Record<symbol | string | number, unknown>> = keyof T;
export type RecordValues<T extends Record<symbol | string | number, unknown>> = T[keyof T];
