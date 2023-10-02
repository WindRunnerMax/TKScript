import ReactDOM from "react-dom";
import { App } from "./components/app";
import { LOG_LEVEL, logger } from "@/utils/logger";

if (process.env.NODE_ENV === "development") {
  logger.setLevel(LOG_LEVEL.INFO);
}

ReactDOM.render(<App></App>, document.getElementById("root"));
