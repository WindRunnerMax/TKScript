declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare const __DEV__: boolean;
declare const browser: typeof chrome | undefined;

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    PLATFORM: "chromium" | "gecko";
    EVENT_TYPE: string;
    INJECT_FILE: string;
  }
}
