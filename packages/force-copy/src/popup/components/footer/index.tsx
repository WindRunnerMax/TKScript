import styles from "./index.module.scss";
import type { FC } from "react";
import type { I18n } from "@/popup/i18n";
import {
  IconExperiment,
  IconGithub,
  IconQuestionCircle,
  IconRefresh,
} from "@arco-design/web-react/icon";
import { cross } from "@/utils/global";
import { Trigger } from "@arco-design/web-react";
import { Tools } from "../tools";

export const Footer: FC<{
  i18n: I18n;
}> = ({ i18n }) => {
  return (
    <div className={styles.footer}>
      <Trigger trigger="click" popup={() => <Tools i18n={i18n}></Tools>}>
        <div className={styles.tools}>
          <IconExperiment />
          {i18n.t("Information.Tools")}
        </div>
      </Trigger>
      <a onClick={() => window.open("https://github.com/WindrunnerMax/TKScript")}>
        <IconGithub />
        {i18n.t("Information.GitHub")}
      </a>
      <a
        onClick={() =>
          window.open(
            "https://github.com/WindrunnerMax/TKScript/tree/master/packages/force-copy/README.md"
          )
        }
      >
        <IconQuestionCircle />
        {i18n.t("Information.Help")}
      </a>
      {__DEV__ && (
        <a onClick={() => cross.runtime.reload()}>
          <IconRefresh />
          {i18n.t("Information.Reload")}
        </a>
      )}
    </div>
  );
};
