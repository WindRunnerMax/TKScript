import { basic } from "./modules/basic";
import type { Website } from "./types/website";

const websites: Website[] = [basic];
const web = websites.find(item => item.regexp.test(location.href));
web && web.init();
