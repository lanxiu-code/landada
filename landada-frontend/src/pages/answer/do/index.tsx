import { ResponseCode } from "@/enum/ResponseCode";
import { getQuestionVoById } from "@/servers/api/questionController";
import {
  Button,
  Card,
  Grid,
  Message,
  Notification,
  Radio,
  Space,
  Typography,
} from "@arco-design/web-react";
import { Fragment, useEffect, useState } from "react";
import { history, useLocation, useMatch } from "umi";
import "./index.less";
import {
  addUserAnswer,
  generateUserAnswerId,
} from "@/servers/api/userAnswerController";
import { ScoringStrategy } from "@/enum/ScoringStrategy";
const { Title, Text } = Typography;
const RadioGroup = Radio.Group;
interface Content {
  title: string;
  options: any[];
}
export default () => {
  const [loading, setLoading] = useState(false);
  const match = useMatch("/answer/do/:id");
  const appId = match?.params.id;
  const [contents, setContents] = useState<Content[]>();
  const [current, setCurrent] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string[]>([]);
  const [resultLoading, setResultLoading] = useState<boolean>(false);
  const [id, setId] = useState<number>();
  const location = useLocation();
  //@ts-ignore
  const appInfo = location.state?.appInfo as API.AppVO;
  const loadData = async () => {
    setLoading(true);
    let idRes = await generateUserAnswerId();
    if (idRes.data.code !== ResponseCode.SUCCESS) {
      Message.error(idRes.data.message as string);
      setLoading(false);
      return;
    }
    setId(idRes.data.data);
    let res = await getQuestionVoById({ id: appId as any });
    if (res.data.code === ResponseCode.SUCCESS) {
      //@ts-ignore
      setContents(JSON.parse(res.data.data?.questionContent));
    } else {
      Message.error(res.data.message as string);
    }
    setLoading(false);
  };
  const onSubmit = async () => {
    setResultLoading(true);
    Notification.info({ content: "正在提交答案，请稍后" });
    let res = await addUserAnswer({
      id,
      appId: appInfo.id,
      appType: appInfo.appType,
      choices: JSON.stringify(userAnswer),
      scoringStrategy: appInfo.scoringStrategy,
    });
    if (res.data.code === ResponseCode.SUCCESS) {
      Notification.success({ content: "提交成功" });
      history.replace(`/answer/result/${res.data.data}`, { appId: appInfo.id });
    } else {
      Message.error(res.data.message as string);
    }
    setResultLoading(false);
  };
  useEffect(() => {
    if (!appInfo?.id) {
      history.back();
    } else {
      loadData();
    }
  }, []);
  return (
    <div className="doPage">
      <Card bodyStyle={{ padding: 10 }} className="card" loading={loading}>
        <div style={{ textAlign: "center" }}>
          <Title heading={3} style={{ margin: "10px" }}>
            {appInfo?.appName}
          </Title>
        </div>
        <Space direction="vertical">
          <Grid.Row>
            {contents?.length && contents[0]?.title.includes("1") && (
              <Text style={{ fontSize: "20px" }}>
                {contents[current]?.title || ""}
              </Text>
            )}
            {contents?.length && !contents[0]?.title.includes("1") && (
              <Text style={{ fontSize: "20px" }}>
                {" "}
                {current + 1}. {contents[current]?.title}
              </Text>
            )}
            {/* {contents?.length && (
              <Text style={{ fontSize: "20px" }}>
                {current + 1}. {contents[current]?.title}
              </Text>
            )} */}
          </Grid.Row>
          <RadioGroup
            value={userAnswer[current]}
            direction="vertical"
            onChange={(val) => {
              userAnswer[current] = val;
              setUserAnswer([...userAnswer]);
            }}
          >
            <Space direction="vertical">
              {contents?.length &&
                contents[current].options.map((item, index) => {
                  return (
                    <Radio
                      checked={item.key === userAnswer[current]}
                      value={item.key}
                      key={index}
                    >
                      <Text style={{ fontSize: "20px" }}>
                        {item.key}.{item.value}
                      </Text>
                    </Radio>
                  );
                })}
            </Space>
          </RadioGroup>
        </Space>

        <Grid.Row style={{ margin: "30px 0" }}>
          <Space>
            <Button
              disabled={current === 0}
              onClick={() => setCurrent(current - 1)}
            >
              上一题
            </Button>
            {contents && current != contents?.length - 1 && (
              <Button
                disabled={
                  current === contents?.length - 1 || !userAnswer[current]
                }
                type="primary"
                onClick={() => setCurrent(current + 1)}
              >
                下一题
              </Button>
            )}
            {contents && current === contents?.length - 1 && (
              <Button
                style={{ width: "80px" }}
                type="primary"
                loading={resultLoading}
                onClick={onSubmit}
              >
                提交
              </Button>
            )}
          </Space>
        </Grid.Row>
      </Card>
    </div>
  );
};
