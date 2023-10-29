const { isDev } = require("./utils");
const WebSocketServer = require("ws").Server;

/**
 * @type {import("ws").WebSocket | null}
 */
let wsClient = null;

exports.ReloadPlugin = class ReloadPlugin {
  constructor() {
    if (isDev) {
      try {
        const server = new WebSocketServer({ port: 3333 });
        server.on("connection", client => {
          wsClient && wsClient.close();
          wsClient = client;
          console.log("Client Connected");
        });
      } catch (error) {
        console.log("Auto Reload Server Error", error);
      }
    }
  }
  apply(compiler) {
    compiler.hooks.afterDone.tap("ReloadPlugin", () => {
      wsClient && wsClient.send("reload-app");
    });
  }
};
