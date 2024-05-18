/* eslint-disable @typescript-eslint/no-namespace */

export namespace Object {
  export type KeyType = string | number | symbol;

  export type Keys<T extends Record<Object.KeyType, unknown>> = keyof T;

  export type Values<T extends Record<Object.KeyType, unknown>> = T[keyof T];
}

export namespace Array {
  export type Values<T extends readonly unknown[]> = T[number];
}

export namespace String {
  export type Map<T extends string> = { [P in T]: P };
}

export namespace Reflex {
  type _Array<T, M extends Record<string, unknown>> = T extends string
    ? [type: T, payload: unknown extends M[T] ? null : M[T]]
    : never;

  export type Array<M extends Record<string, unknown>> = _Array<Object.Keys<M>, M>;

  type _Map<T extends Object.KeyType, M extends Record<Object.KeyType, unknown>> = {
    [P in T]: { type: P; payload: unknown extends M[P] ? never : M[P] };
  };

  export type Tuple<M extends Record<string, unknown>> = Object.Values<_Map<Object.Keys<M>, M>>;
}
