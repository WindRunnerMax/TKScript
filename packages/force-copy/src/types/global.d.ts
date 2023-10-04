declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

declare const browser: typeof chrome | undefined;
