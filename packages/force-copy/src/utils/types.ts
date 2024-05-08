export type ArrayValues<T extends readonly unknown[]> = T[number];

export type RecordKeys<T extends Record<string, unknown>> = keyof T;

export type RecordValues<T extends Record<symbol | string | number, unknown>> = T[keyof T];

export type EventMapToArray<T, M extends Record<string, unknown>> = T extends string
  ? [key: T, payload: M[T]]
  : never;

export type EventMapToRecord<T extends string, M extends Record<string, unknown>> = {
  [P in T]: { key: P; payload: M[P] };
};
