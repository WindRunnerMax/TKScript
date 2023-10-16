declare type ArrayValues<T extends Array<unknown>> = T[number];
declare type RecordKeys<T extends Record<symbol | string | number, unknown>> = keyof T;
declare type RecordValues<T extends Record<symbol | string | number, unknown>> = T[keyof T];
