import { Button, Grid } from "@arco-design/web-react";
import styles from "./index.module.scss";
import type { FC } from "react";
import type { I18n } from "@/popup/i18n";

const Row = Grid.Row;
const Col = Grid.Col;

export const Tools: FC<{
  i18n: I18n;
  visible?: boolean;
}> = ({ i18n }) => {
  return (
    <div className={styles.container}>
      <Row className={styles.row} gutter={10}>
        <Col span={12}>
          <Button size="mini">{i18n.t("Tools.MouseEvent")}</Button>
        </Col>
        <Col span={12}>
          <Button size="mini">{i18n.t("Tools.FocusEvent")}</Button>
        </Col>
      </Row>
      <Row className={styles.row}>
        <Col span={12}>
          <Button size="mini">{i18n.t("Tools.Editable")}</Button>
        </Col>
      </Row>
    </div>
  );
};
