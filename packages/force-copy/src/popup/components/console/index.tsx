import type { FC } from "react";
import { Fragment, useLayoutEffect, useState } from "react";
import styles from "./index.module.scss";
import { PCBridge } from "@/bridge/popup-content";
import type { I18n } from "../../i18n";
import { setBadgeNumber as setNextBadgeNumber } from "../../utils/badge";
import { PC_QUERY_STATE_ENUM } from "@/bridge/popup-content/response";
import { Grid, Switch } from "@arco-design/web-react";

const Row = Grid.Row;
const Col = Grid.Col;

export const Console: FC<{
  i18n: I18n;
}> = props => {
  const { i18n } = props;
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
    setNextBadgeNumber(checked);
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
      payload: null,
    }).then(res => {
      if (res && res.type === PCBridge.REQUEST.QUERY_STATE) {
        for (const [key, value] of Object.entries(res.payload)) {
          const handler = mapper[key];
          handler && handler(value);
        }
      }
    });
  }, []);

  return (
    <Fragment>
      <Row className={styles.captain}>
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
    </Fragment>
  );
};
