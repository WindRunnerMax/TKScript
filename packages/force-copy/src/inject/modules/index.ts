import type { WebSite } from "../types/website";
import { Basic } from "./basic";
import { Doc88 } from "./doc88";
import { DocIn } from "./docin";
import { QQDoc } from "./qq-doc";
import { QQPpt } from "./qq-ppt";
import { Wenku } from "./wenku";
import { Zhihu } from "./zhihu";

export const websites: WebSite[] = [Wenku, Doc88, QQDoc, DocIn, Zhihu, QQPpt, Basic];
