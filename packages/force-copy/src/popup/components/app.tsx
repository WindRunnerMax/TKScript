import { FC, useLayoutEffect, useState } from "react";
import { Switch, Grid } from "@arco-design/web-react";
import { IconGithub, IconQuestionCircle, IconRefresh } from "@arco-design/web-react/icon";
import styles from "./index.module.scss";
import { cs } from "laser-utils";
import { POPUP_TO_CONTENT_REQUEST, PCBridge } from "@/bridge/popup-content";
import { PC_QUERY_STATE_TYPE } from "@/bridge/constant";
const Row = Grid.Row;
const Col = Grid.Col;

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
    const queue = [
      { key: PC_QUERY_STATE_TYPE.COPY, state: setCopyState, once: false },
      { key: PC_QUERY_STATE_TYPE.MENU, state: setMenuState, once: false },
      { key: PC_QUERY_STATE_TYPE.KEYBOARD, state: setKeydownState, once: false },
      { key: PC_QUERY_STATE_TYPE.COPY, state: setCopyStateOnce, once: true },
      { key: PC_QUERY_STATE_TYPE.MENU, state: setMenuStateOnce, once: true },
      { key: PC_QUERY_STATE_TYPE.KEYBOARD, state: setKeydownStateOnce, once: true },
    ];
    queue.forEach(item => {
      PCBridge.postToContent({
        type: POPUP_TO_CONTENT_REQUEST.QUERY_STATE,
        payload: { once: item.once, type: item.key },
      }).then(r => {
        r && item.state(r.payload);
      });
    });
  }, []);

  return (
    <div className={cs(styles.container)}>
      <div className={cs(styles.captain)}>
        <img src="./static/favicon.128.png" alt="" />
        <span>Force Copy</span>
      </div>

      <div className={styles.hr}></div>

      <div className={styles.console}>
        <Row className={styles.copy}>
          <Col span={8} className={styles.name}>
            Modules
          </Col>
          <Col span={8} className={styles.switch}>
            Start
          </Col>
          <Col span={8} className={styles.switch}>
            Once
          </Col>
        </Row>
        <Row className={styles.copy}>
          <Col span={8} className={styles.name}>
            Copy
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
            Keyboard
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
            ContextMenu
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
          GitHub
        </a>
        <a onClick={() => window.open("https://github.com/WindrunnerMax/TKScript")}>
          <IconQuestionCircle />
          Help
        </a>
        {process.env.NODE_ENV === "development" && (
          <a onClick={() => chrome.runtime.reload()}>
            <IconRefresh />
            Reload
          </a>
        )}
      </div>
    </div>
  );
};
