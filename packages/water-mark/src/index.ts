import { csdn } from "./modules/csdn";
import { feishu } from "./modules/feishu";
import type { Website } from "./types/website";

const websites: Website[] = [feishu, csdn];
const web = websites.find(item => item.regexp.test(location.href));
web && web.init();
