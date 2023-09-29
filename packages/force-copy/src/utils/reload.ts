export const RELOAD_APP = "RELOAD_APP";

export const sendReloadMsg = () => {
  if (process.env.NODE_ENV === "development") {
    const ws = new WebSocket("ws://localhost:3333");
    // 收到消息即重载
    ws.onmessage = () => {
      try {
        chrome.runtime.sendMessage(RELOAD_APP);
      } catch (error) {
        console.log("SEND MESSAGE ERROR", error);
      }
    };
  }
};

export const reloadApp = (msg: unknown) => {
  if (process.env.NODE_ENV === "development" && msg === RELOAD_APP) {
    chrome.runtime.reload();
    console.log("RELOAD SUCCESS");
  }
};