import { FC, useLayoutEffect, useState } from "react";
import { Switch, Grid } from "@arco-design/web-react";
import { IconGithub, IconQuestionCircle, IconRefresh } from "@arco-design/web-react/icon";
import styles from "./index.module.scss";
import { cs } from "laser-utils";
import { POPUP_CONTENT_ACTION, PopupContentBridge, QUERY_STATE_KEY } from "@/content/bridge/popup";
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
      | typeof POPUP_CONTENT_ACTION.MENU
      | typeof POPUP_CONTENT_ACTION.KEYDOWN
      | typeof POPUP_CONTENT_ACTION.COPY,
    checked: boolean,
    once = false
  ) => {
    PopupContentBridge.postMessage({ type: type, payload: { checked, once } });
  };

  useLayoutEffect(() => {
    const queue = [
      { key: QUERY_STATE_KEY.STORAGE_COPY, state: setCopyState },
      { key: QUERY_STATE_KEY.STORAGE_MENU, state: setMenuState },
      { key: QUERY_STATE_KEY.STORAGE_KEYDOWN, state: setKeydownState },
      { key: QUERY_STATE_KEY.SESSION_COPY, state: setCopyStateOnce },
      { key: QUERY_STATE_KEY.SESSION_MENU, state: setMenuStateOnce },
      { key: QUERY_STATE_KEY.SESSION_KEYDOWN, state: setKeydownStateOnce },
    ];
    queue.forEach(item => {
      // PopupContentBridge.postMessage({
      //   type: POPUP_CONTENT_ACTION.QUERY_STATE,
      //   payload: item.key,
      // }).then(r => {
      //   r && item.state(r.payload);
      // });
    });
  }, []);

  return (
    <div className={cs(styles.container)}>
      <div className={cs(styles.captain)}>
        <img src="./static/favicon.png" alt="" />
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
                onSwitchChange(POPUP_CONTENT_ACTION.COPY, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={copyStateOnce}
              onChange={v => {
                setCopyStateOnce(v);
                onSwitchChange(POPUP_CONTENT_ACTION.COPY, v, true);
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
                onSwitchChange(POPUP_CONTENT_ACTION.KEYDOWN, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={keydownStateOnce}
              onChange={v => {
                setKeydownStateOnce(v);
                onSwitchChange(POPUP_CONTENT_ACTION.KEYDOWN, v, true);
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
                onSwitchChange(POPUP_CONTENT_ACTION.MENU, v);
              }}
            />
          </Col>
          <Col span={8} className={styles.switch}>
            <Switch
              type="line"
              checked={menuStateOnce}
              onChange={v => {
                setMenuStateOnce(v);
                onSwitchChange(POPUP_CONTENT_ACTION.MENU, v, true);
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
