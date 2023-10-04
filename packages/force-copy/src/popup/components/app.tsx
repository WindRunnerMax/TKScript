import { FC, useLayoutEffect, useState } from "react";
import { Switch, Grid } from "@arco-design/web-react";
import { IconGithub, IconQuestionCircle, IconRefresh } from "@arco-design/web-react/icon";
import styles from "./index.module.scss";
import { cs } from "laser-utils";
import {
  POPUP_TO_CONTENT_REQUEST,
  PCBridge,
  POPUP_TO_CONTENT_RESPONSE,
} from "@/bridge/popup-content";
import { PC_QUERY_STATE_TYPE } from "@/bridge/constant";
import { I18n } from "../i18n";
import { cross } from "@/utils/global";
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
      | typeof POPUP_TO_CONTENT_REQUEST.COPY_TYPE
      | typeof POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE
      | typeof POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE,
    checked: boolean,
    once = false
  ) => {
    PCBridge.postToContent({ type: type, payload: { checked, once } });
  };

  useLayoutEffect(() => {
    const mapper: Record<string, typeof setCopyState> = {
      [PC_QUERY_STATE_TYPE.COPY]: setCopyState,
      [PC_QUERY_STATE_TYPE.MENU]: setMenuState,
      [PC_QUERY_STATE_TYPE.KEYBOARD]: setKeydownState,
      [PC_QUERY_STATE_TYPE.COPY_ONCE]: setCopyStateOnce,
      [PC_QUERY_STATE_TYPE.MENU_ONCE]: setMenuStateOnce,
      [PC_QUERY_STATE_TYPE.KEYBOARD_ONCE]: setKeydownStateOnce,
    };
    PCBridge.postToContent({
      type: POPUP_TO_CONTENT_REQUEST.QUERY_STATE,
    }).then(res => {
      if (res && res.type === POPUP_TO_CONTENT_RESPONSE.STATE) {
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
                onSwitchChange(POPUP_TO_CONTENT_REQUEST.COPY_TYPE, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={copyStateOnce}
              onChange={v => {
                setCopyStateOnce(v);
                onSwitchChange(POPUP_TO_CONTENT_REQUEST.COPY_TYPE, v, true);
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
                onSwitchChange(POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={keydownStateOnce}
              onChange={v => {
                setKeydownStateOnce(v);
                onSwitchChange(POPUP_TO_CONTENT_REQUEST.KEYBOARD_TYPE, v, true);
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
                onSwitchChange(POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={menuStateOnce}
              onChange={v => {
                setMenuStateOnce(v);
                onSwitchChange(POPUP_TO_CONTENT_REQUEST.CONTEXT_MENU_TYPE, v, true);
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
        <a onClick={() => window.open("https://github.com/WindrunnerMax/TKScript")}>
          <IconQuestionCircle />
          {i18n.t("Information.Help")}
        </a>
        {process.env.NODE_ENV === "development" && (
          <a onClick={() => cross.runtime.reload()}>
            <IconRefresh />
            {i18n.t("Information.Reload")}
          </a>
        )}
      </div>
    </div>
  );
};
