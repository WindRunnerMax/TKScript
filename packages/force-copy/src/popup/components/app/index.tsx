import type { FC } from "react";
import styles from "./index.module.scss";
import { cs } from "laser-utils";
import { I18n } from "../../i18n";
import { cross } from "@/utils/global";
import { Console } from "../console";
import { Header } from "../header";
import { Footer } from "../footer";

// https://www.rfc-editor.org/rfc/rfc9110.html#name-language-tags
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/i18n
const i18n = new I18n(cross.i18n.getUILanguage());

export const App: FC = () => {
  return (
    <div className={cs(styles.container)}>
      <Header i18n={i18n}></Header>
      <div className={styles.hr}></div>
      <Console i18n={i18n}></Console>
      <div className={styles.hr}></div>
      <Footer i18n={i18n}></Footer>
    </div>
  );
};
