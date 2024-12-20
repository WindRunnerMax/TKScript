import { Button, Grid } from "@arco-design/web-react";
import styles from "./index.module.scss";
import type { FC } from "react";
import type { I18n } from "@/popup/i18n";
import { PCBridge } from "@/bridge/popup-content";

const GridItem = Grid.GridItem;

export const Tools: FC<{
  i18n: I18n;
  visible?: boolean;
}> = ({ i18n }) => {
  return (
    <div className={styles.container}>
      <Grid cols={2} colGap={10} rowGap={5}>
        <GridItem>
          <Button
            size="mini"
            onClick={() =>
              PCBridge.postToContent({
                type: PCBridge.REQUEST.DEBUG_MOUSE_EVENT,
                payload: null,
              })
            }
          >
            {i18n.t("Tools.MouseEvent")}
          </Button>
        </GridItem>
        <GridItem>
          <Button
            onClick={() =>
              PCBridge.postToContent({
                type: PCBridge.REQUEST.DEBUG_FOCUS_EVENT,
                payload: null,
              })
            }
            size="mini"
          >
            {i18n.t("Tools.FocusEvent")}
          </Button>
        </GridItem>
        <GridItem>
          <Button
            onClick={() =>
              PCBridge.postToContent({
                type: PCBridge.REQUEST.DEBUG_EDITABLE,
                payload: null,
              })
            }
            size="mini"
          >
            {i18n.t("Tools.Editable")}
          </Button>
        </GridItem>
        <GridItem>
          <Button
            onClick={() =>
              PCBridge.postToContent({
                type: PCBridge.REQUEST.DEBUG_PASTE_EVENT,
                payload: null,
              })
            }
            size="mini"
          >
            {i18n.t("Tools.PasteEvent")}
          </Button>
        </GridItem>
      </Grid>
    </div>
  );
};
