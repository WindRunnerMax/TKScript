import { PCBridge } from "@/bridge/popup-content";
import { sendReloadMsg } from "../utils/reload";
import { implantScript } from "./runtime/implant-script";
import { onPopupMessage } from "./runtime/popup-message";

(() => {
  if (process.env.NODE_ENV === "development") {
    sendReloadMsg();
  }
  implantScript();
  PCBridge.onPopupMessage(onPopupMessage);
})();
