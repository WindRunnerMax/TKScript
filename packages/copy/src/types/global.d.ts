declare interface Document {
    selection: {
        createRange: () => {
            text: string;
        };
    };
}

declare function GM_xmlhttpRequest(params: {
    method: GET | POST;
    url: string;
    onload: (response: { status: number; responseText: string }) => void;
}): void;

declare const unsafeWindow = any;

declare module "*.css" {
    const content: string;
    export default content;
}
