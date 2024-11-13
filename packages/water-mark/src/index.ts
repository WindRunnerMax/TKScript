import { common } from "./modules/common";
import type { Website } from "./types/website";

const websites: Website[] = [common];
const web = websites.find(item => item.regexp.test(location.href));
web && web.init();
