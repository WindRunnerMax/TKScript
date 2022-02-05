declare const unsafeWindow = any;

declare function GM_registerMenuCommand(name: string, fn: () => void, index?: string): number;
declare function GM_unregisterMenuCommand(id: number): void;
