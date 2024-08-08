import {
  Button,
  Form,
  Grid,
  Collapse,
  Typography,
  Icon,
  Radio,
  Result,
  Space,
  Message,
  Notification,
} from "@arco-design/web-react";
import "./index.less";
import CustomStep from "@/components/CustomStep";
import { Fragment, useEffect, useState } from "react";
import { history, useLocation, useModel } from "umi";
import AddQuestion from "@/components/AddQuestion";
import { ICONFONT_URL } from "@/constant/common";
import {
  addQuestion,
  getQuestionVoById,
} from "@/servers/api/questionController";
import { ResponseCode } from "@/enum/ResponseCode";
import AiGenerateQuestionDrawer from "@/components/AiGenerateQuestionDrawer";
import PubSub from "pubsub-js";
const { Title, Text, Paragraph } = Typography;
const FormItem = Form.Item;
const CollapseItem = Collapse.Item;
const RadioGroup = Radio.Group;
export default () => {
  const IconFont = Icon.addFromIconFontCn({
    src: ICONFONT_URL,
  });
  const [questionList, setQuestionList] = useState<any[]>([]);
  const [current, setCurrent] = useState<number>(-1);
  const [nextIndex, setNextIndex] = useState<number>(0);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const location = useLocation();
  PubSub.subscribe("addQuestionList", (_, data) => {
    console.log(data);
    if (data.length > 0 || Object.keys(data).length > 0) {
      setCurrent(current + 1);
    }
    if (data.hasOwnProperty("length")) {
      setQuestionList([...questionList, ...data]);
    } else {
      let index = questionList.findIndex((item) => item.title === data.title);
      if (index == -1) {
        questionList.push(data);
        setQuestionList(questionList);
      }
    }
  });
  //@ts-ignore
  const app = location.state?.app as API.AppVO;
  const loadData = async () => {
    let res = await getQuestionVoById({ id: app.id as number });
    if (res.data.code === ResponseCode.SUCCESS) {
      Message.info("该应用已经创建过题目");
      history.push("/add/scoring_result", {
        app,
      });
    }
  };
  useEffect(() => {
    if (!app?.id) {
      history.back();
    } else {
      loadData();
    }
  }, []);
  const saveQuestion = async () => {
    let res = await addQuestion({
      appId: app?.id,
      questionContent: JSON.stringify(questionList),
    });
    if (res.data.code === ResponseCode.SUCCESS) {
      Message.success("创建成功");
      history.push("/add/scoring_result", {
        app,
      });
    } else {
      //@ts-ignore
      Message.error(res.data.message);
    }
  };
  return (
    <div className="addQuestionPage">
      <Grid.Row align="start" justify="space-around">
        <Grid.Col xs={24} md={3}>
          <CustomStep prefix={!app?.id ? "创建" : "修改"} current={2} />
        </Grid.Col>
        <Grid.Col xs={24} md={16}>
          <Title heading={3}>
            {!app?.id ? "创建" : "修改"}题目-{app?.appName || "未命名应用"}
          </Title>
          {showAdd && (
            <AddQuestion
              app={app}
              nextIndex={nextIndex}
              onCancel={() => setShowAdd(false)}
              onOk={(data: any) => {
                setQuestionList([...questionList, data]);
                if (data.title) {
                  setNextIndex(nextIndex + 1);
                  setCurrent(current + 1);
                }
                setShowAdd(false);
              }}
            />
          )}
          {!showAdd && questionList.length > 0 && (
            <Fragment>
              <Title heading={5}>
                {questionList[0]?.title?.includes("1") ? (
                  <Fragment>{questionList[current]?.title || ""}</Fragment>
                ) : (
                  <Fragment>
                    第{current + 1}题-{questionList[current]?.title || ""}
                  </Fragment>
                )}
                {/* 第{current + 1}题-{questionList[current]?.title || ""} */}
              </Title>
              <Paragraph>
                <RadioGroup direction="vertical" defaultValue="a">
                  {questionList[current]?.options?.map(
                    (item: any, index: number) => {
                      return (
                        <Radio value={item.key} key={index}>
                          {item.key} . {item.value}
                        </Radio>
                      );
                    }
                  )}
                </RadioGroup>
              </Paragraph>
              <Space>
                <Button
                  disabled={current === 0}
                  onClick={() => {
                    setCurrent(current - 1);
                  }}
                >
                  上一题
                </Button>
                <Button
                  disabled={current === questionList.length - 1}
                  onClick={() => {
                    setCurrent(current + 1);
                  }}
                >
                  下一题
                </Button>
                <Button type="primary" onClick={saveQuestion}>
                  创建
                </Button>
              </Space>
            </Fragment>
          )}
          {!questionList.length && !showAdd && (
            <Result title="右侧添加题目"></Result>
          )}
        </Grid.Col>
        <Grid.Col xs={24} md={4}>
          <Collapse
            bordered={false}
            destroyOnHide
            accordion
            style={{ maxWidth: 1180 }}
          >
            <CollapseItem
              header="选择题"
              name="1"
              contentStyle={{ padding: 8 }}
            >
              <Button
                type="text"
                size="mini"
                onClick={() => {
                  setShowAdd(true);
                }}
                icon={<IconFont type="icon-danxuanxuanzhong" />}
              >
                单选题
              </Button>
              <Button
                type="text"
                size="mini"
                onClick={() => {
                  setDrawerVisible(true);
                }}
                icon={<IconFont type="icon-danxuanxuanzhong" />}
              >
                单选题(AI生成)
              </Button>
            </CollapseItem>
          </Collapse>
        </Grid.Col>
      </Grid.Row>
      <AiGenerateQuestionDrawer
        appId={app?.id as number}
        visible={drawerVisible}
        onOk={() => {
          setDrawerVisible(false);
        }}
        onCancel={() => setDrawerVisible(false)}
      />
    </div>
  );
};
