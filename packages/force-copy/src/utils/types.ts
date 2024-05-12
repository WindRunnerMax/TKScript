/* eslint-disable @typescript-eslint/no-namespace */
export namespace Object {
  export type Keys<T extends Record<string, unknown>> = keyof T;

  export type Values<T extends Record<symbol | string | number, unknown>> = T[keyof T];
}

export namespace Array {
  export type Values<T extends readonly unknown[]> = T[number];
}

export namespace String {
  export type Map<T extends string> = { [P in T]: P };
}

export namespace EventReflect {
  export type Array<T, M extends Record<string, unknown>> = T extends string
    ? [type: unknown extends M[T] ? never : T, payload: M[T]]
    : never;

  export type Map<T extends string, M extends Record<string, unknown>> = {
    [P in T]: { type: unknown extends M[P] ? never : P; payload: M[P] };
  };

  export type Tuple<
    T extends Record<string, string>,
    M extends Record<string, unknown>
  > = Object.Values<Map<Object.Values<T>, M>>;
}
