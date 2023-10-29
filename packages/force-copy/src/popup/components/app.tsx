import { FC, useLayoutEffect, useState } from "react";
import { Switch, Grid } from "@arco-design/web-react";
import { IconGithub, IconQuestionCircle, IconRefresh } from "@arco-design/web-react/icon";
import styles from "./index.module.scss";
import { cs } from "laser-utils";
import { PCBridge } from "@/bridge/popup-content";
import { PC_QUERY_STATE_ENUM } from "@/bridge/constant";
import { I18n } from "../i18n";
import { cross } from "@/utils/global";
import { cipherBadgeNumber } from "../utils/badge";

const Row = Grid.Row;
const Col = Grid.Col;

const i18n = new I18n(cross.i18n.getUILanguage());

export const App: FC = () => {
  const [copyState, setCopyState] = useState(false);
  const [copyStateOnce, setCopyStateOnce] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [menuStateOnce, setMenuStateOnce] = useState(false);
  const [keydownState, setKeydownState] = useState(false);
  const [keydownStateOnce, setKeydownStateOnce] = useState(false);

  const onSwitchChange = (
    type:
      | typeof PCBridge.REQUEST.COPY_TYPE
      | typeof PCBridge.REQUEST.KEYBOARD_TYPE
      | typeof PCBridge.REQUEST.CONTEXT_MENU_TYPE,
    checked: boolean,
    once = false
  ) => {
    PCBridge.postToContent({ type: type, payload: { checked, once } });
    cipherBadgeNumber(checked);
  };

  useLayoutEffect(() => {
    const mapper: Record<string, typeof setCopyState> = {
      [PC_QUERY_STATE_ENUM.COPY]: setCopyState,
      [PC_QUERY_STATE_ENUM.MENU]: setMenuState,
      [PC_QUERY_STATE_ENUM.KEYBOARD]: setKeydownState,
      [PC_QUERY_STATE_ENUM.COPY_ONCE]: setCopyStateOnce,
      [PC_QUERY_STATE_ENUM.MENU_ONCE]: setMenuStateOnce,
      [PC_QUERY_STATE_ENUM.KEYBOARD_ONCE]: setKeydownStateOnce,
    };
    PCBridge.postToContent({
      type: PCBridge.REQUEST.QUERY_STATE,
    }).then(res => {
      if (res && res.type === PCBridge.RESPONSE.STATE) {
        for (const [key, value] of Object.entries(res.payload)) {
          const handler = mapper[key];
          handler && handler(value);
        }
      }
    });
  }, []);

  return (
    <div className={cs(styles.container)}>
      <div className={cs(styles.captain)}>
        <img src="./static/favicon.128.png" alt="" />
        <span>{i18n.t("Title")}</span>
      </div>

      <div className={styles.hr}></div>

      <div className={styles.console}>
        <Row className={styles.copy}>
          <Col span={8} className={styles.name}>
            {i18n.t("Captain.Modules")}
          </Col>
          <Col span={8} className={styles.switch}>
            {i18n.t("Captain.Start")}
          </Col>
          <Col span={8} className={styles.switch}>
            {i18n.t("Captain.Once")}
          </Col>
        </Row>
        <Row className={styles.copy}>
          <Col span={8} className={styles.name}>
            {i18n.t("Operation.Copy")}
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={copyState}
              onChange={v => {
                setCopyState(v);
                onSwitchChange(PCBridge.REQUEST.COPY_TYPE, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={copyStateOnce}
              onChange={v => {
                setCopyStateOnce(v);
                onSwitchChange(PCBridge.REQUEST.COPY_TYPE, v, true);
              }}
            />
          </Col>
        </Row>
        <Row className={styles.keyboard}>
          <Col span={8} className={styles.name}>
            {i18n.t("Operation.Keyboard")}
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={keydownState}
              onChange={v => {
                setKeydownState(v);
                onSwitchChange(PCBridge.REQUEST.KEYBOARD_TYPE, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={keydownStateOnce}
              onChange={v => {
                setKeydownStateOnce(v);
                onSwitchChange(PCBridge.REQUEST.KEYBOARD_TYPE, v, true);
              }}
            />
          </Col>
        </Row>
        <Row className={styles.menu}>
          <Col span={8} className={styles.moduleName}>
            {i18n.t("Operation.ContextMenu")}
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={menuState}
              onChange={v => {
                setMenuState(v);
                onSwitchChange(PCBridge.REQUEST.CONTEXT_MENU_TYPE, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={menuStateOnce}
              onChange={v => {
                setMenuStateOnce(v);
                onSwitchChange(PCBridge.REQUEST.CONTEXT_MENU_TYPE, v, true);
              }}
            />
          </Col>
        </Row>
      </div>

      <div className={styles.hr}></div>

      <div className={styles.footer}>
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
    </div>
  );
};
