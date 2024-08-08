import {
  Button,
  Grid,
  Message,
  Space,
  Typography,
} from "@arco-design/web-react";
import "./index.less";
import CustomStep from "@/components/CustomStep";

import { useEffect, useRef, useState } from "react";

import {
  IconCheckCircle,
  IconHome,
  IconPlus,
} from "@arco-design/web-react/icon";
import ScoringResultTable from "@/components/ScoringResultTable";
import AddScoringResult from "@/components/AddScoringResult";
import { history, useLocation } from "umi";

const { Title } = Typography;
export default () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  //@ts-ignore
  const app = location.state?.app as API.AppVO;
  useEffect(() => {
    if (!app?.id) {
      history.back();
    }
  }, []);
  return (
    <div className="scoringResultPage">
      <Grid.Row align="start" justify="space-around">
        <Grid.Col xs={24} md={3}>
          <CustomStep prefix={!app?.id ? "创建" : "修改"} current={3} />
        </Grid.Col>
        <Grid.Col xs={24} md={19}>
          <Grid.Row align="center" justify="space-between">
            <Grid.Col span={5}>
              <Title heading={3}>{!app?.id ? "创建" : "修改"}评分结果</Title>
            </Grid.Col>
            <Grid.Col span={3.5}>
              <Space>
                <Button
                  onClick={() => setVisible(true)}
                  type="primary"
                  icon={<IconPlus />}
                >
                  创建
                </Button>
                <Button
                  onClick={() => {
                    Message.success("题目创建成功");
                    history.replace("/");
                  }}
                  type="primary"
                  icon={<IconCheckCircle />}
                >
                  完成
                </Button>
              </Space>
              <AddScoringResult
                app={app}
                visible={visible}
                onOk={() => {
                  setVisible(false);
                }}
                onCancel={() => setVisible(false)}
              />
            </Grid.Col>
          </Grid.Row>
          <ScoringResultTable app={app} />
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
