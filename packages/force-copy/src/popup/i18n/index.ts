import { isString } from "laser-utils";
import type { ConfigBlock, I18nTypes } from "./types";
import { en } from "./en";
import { zh } from "./zh";

const cache: Record<string, I18nTypes> = {};

export class I18n {
  private config: I18nTypes;
  constructor(language: string) {
    this.config = I18n.getFullConfig(language);
  }

  public t = (key: keyof I18nTypes, defaultValue = "") => {
    return this.config[key] || defaultValue || key;
  };

  private static getFullConfig = (key: string) => {
    if (cache[key]) return cache[key];
    let config;
    if (key.toLowerCase().startsWith("zh")) {
      config = this.generateFlattenConfig(zh);
    } else {
      config = this.generateFlattenConfig(en);
    }
    cache[key] = config;
    return config;
  };

  private static generateFlattenConfig = (config: ConfigBlock): I18nTypes => {
    const target: Record<string, string> = {};
    const dfs = (obj: ConfigBlock, prefix: string[]) => {
      for (const [key, value] of Object.entries(obj)) {
        if (isString(value)) {
          target[[...prefix, key].join(".")] = value;
        } else {
          dfs(value, [...prefix, key]);
        }
      }
    };
    dfs(config, []);
    return target as I18nTypes;
  };
}
