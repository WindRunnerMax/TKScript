import { COPY } from "../constant/event";
import { isString } from "./is";

type CopyData = {
  "text/plain": string;
  "text/html"?: string;
} & Record<string, string>;

export type CopyParams = CopyData | string;

export const TEXT_PLAIN = "text/plain";
export const TEXT_HTML = "text/html";

const execCopyCommand = (data: CopyData) => {
  const textarea = document.createElement("textarea");
  const handler = (event: ClipboardEvent) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    for (const [key, value] of Object.entries(data)) {
      event.clipboardData && event.clipboardData.setData(key, value);
    }
  };
  textarea.addEventListener(COPY, handler, true);
  textarea.style.position = "fixed";
  textarea.style.left = "-999999999px";
  textarea.style.top = "-999999999px";
  textarea.value = data[TEXT_PLAIN] || " ";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.removeEventListener(COPY, handler);
  document.body.removeChild(textarea);
};

export const isEmptyContent = (data: CopyParams): boolean => {
  if (!data) return true;
  return isString(data) ? !data : !data[TEXT_PLAIN];
};

export const copy = (data: CopyParams): boolean => {
  const params: CopyData = isString(data) ? { [TEXT_PLAIN]: data } : data;
  const plainText = params[TEXT_PLAIN];
  if (!plainText) return false;
  if (navigator.clipboard && window.ClipboardItem) {
    const dataItems: Record<string, Blob> = {};
    for (const [key, value] of Object.entries(params)) {
      const blob = new Blob([value], { type: key });
      dataItems[key] = blob;
    }
    navigator.clipboard.write([new ClipboardItem(dataItems)]).catch(() => {
      execCopyCommand(params);
    });
  } else {
    execCopyCommand(params);
  }
  return true;
};
