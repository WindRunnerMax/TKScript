import ReactDOM from "react-dom";
import { App } from "./components/app";
import { LOG_LEVEL, logger } from "@/utils/logger";

if (__DEV__) {
  logger.setLevel(LOG_LEVEL.INFO);
}

const darkThemeMatch = window.matchMedia("(prefers-color-scheme: dark)");
if (darkThemeMatch.matches) document.body.setAttribute("arco-theme", "dark");
ReactDOM.render(<App></App>, document.getElementById("root"));
