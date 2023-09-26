import { FC, useLayoutEffect, useState } from "react";
import { Switch } from "@arco-design/web-react";
import style from "./index.module.scss";
import { cs } from "laser-utils";
import { POPUP_CONTENT_ACTION, PopupContentBridge, QUERY_STATE_KEY } from "@/bridge/popup-content";

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
      PopupContentBridge.postMessage({
        type: POPUP_CONTENT_ACTION.QUERY_STATE,
        payload: item.key,
      }).then(r => {
        r && item.state(r.payload);
      });
    });
  }, []);

  return (
    <div className={cs(style.container)}>
      <table>
        <tbody>
          <tr>
            <td className={style.logo}>
              <img src="./static/favicon.png" alt="" />
              <span>文本复制-通用</span>
            </td>
            <td>启动</td>
            <td>仅本次</td>
          </tr>
          <tr>
            <td>
              <span className={style.moduleName}>解除复制限制</span>
            </td>
            <td>
              <Switch
                type="line"
                checked={copyState}
                onChange={v => {
                  setCopyState(v);
                  onSwitchChange(POPUP_CONTENT_ACTION.COPY, v);
                }}
              />
            </td>
            <td>
              <Switch
                type="line"
                checked={copyStateOnce}
                onChange={v => {
                  setCopyStateOnce(v);
                  onSwitchChange(POPUP_CONTENT_ACTION.COPY, v, true);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span className={style.moduleName}>解除右键限制</span>
            </td>
            <td>
              <Switch
                type="line"
                checked={menuState}
                onChange={v => {
                  setMenuState(v);
                  onSwitchChange(POPUP_CONTENT_ACTION.MENU, v);
                }}
              />
            </td>
            <td>
              <Switch
                type="line"
                checked={menuStateOnce}
                onChange={v => {
                  setMenuStateOnce(v);
                  onSwitchChange(POPUP_CONTENT_ACTION.MENU, v, true);
                }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <span className={style.moduleName}>解除键盘限制</span>
            </td>
            <td>
              <Switch
                type="line"
                checked={keydownState}
                onChange={v => {
                  setKeydownState(v);
                  onSwitchChange(POPUP_CONTENT_ACTION.KEYDOWN, v);
                }}
              />
            </td>
            <td>
              <Switch
                type="line"
                checked={keydownStateOnce}
                onChange={v => {
                  setKeydownStateOnce(v);
                  onSwitchChange(POPUP_CONTENT_ACTION.KEYDOWN, v, true);
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
