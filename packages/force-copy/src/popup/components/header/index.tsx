import { cs } from "laser-utils";
import styles from "./index.module.scss";
import type { FC } from "react";
import type { I18n } from "@/popup/i18n";

export const Header: FC<{
  i18n: I18n;
}> = ({ i18n }) => {
  return (
    <div className={cs(styles.captain)}>
      <img src="./static/favicon.128.png" alt="" />
      <span>{i18n.t("Title")}</span>
    </div>
  );
};
