import type { en } from "./en";

export type DefaultI18nConfig = typeof en;

export type ConfigBlock = {
  [key: string]: string | ConfigBlock;
};
type FlattenKeys<T extends ConfigBlock, Key = keyof T> = Key extends string
  ? T[Key] extends ConfigBlock
    ? `${Key}.${FlattenKeys<T[Key]>}`
    : `${Key}`
  : never;
export type I18nTypes = Record<FlattenKeys<DefaultI18nConfig>, string>;
