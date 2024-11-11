declare const unsafeWindow = any;

declare module "*.css" {
  const content: string;
  export default content;
}
