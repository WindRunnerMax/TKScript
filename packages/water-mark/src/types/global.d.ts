declare const unsafeWindow = any;

declare module "*.css" {
  const content: string;
  export default content;
}

declare const GM_addStyle: (css: string) => void;
