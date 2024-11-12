import { common } from "./modules/common";
import { csdn } from "./modules/csdn";
import type { Website } from "./types/website";

const websites: Website[] = [csdn, common];
const web = websites.find(item => item.regexp.test(location.href));
web && web.init();
