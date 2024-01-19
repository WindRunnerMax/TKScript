import type { WebSite } from "../types/website";
import { Basic } from "./basic";
import { Boke } from "./boke";
import { Doc88 } from "./doc88";
import { DocIn } from "./docin";
import { QQDoc } from "./qqdoc";
import { Wenku } from "./wenku";
import { Zhihu } from "./zhihu";

export const websites: WebSite[] = [Wenku, Doc88, QQDoc, DocIn, Boke, Zhihu, Basic];
