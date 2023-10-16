import ReactDOM from "react-dom";
import { App } from "./components/app";
import { LOG_LEVEL, logger } from "@/utils/logger";

if (__DEV__) {
  logger.setLevel(LOG_LEVEL.INFO);
}

ReactDOM.render(<App></App>, document.getElementById("root"));
