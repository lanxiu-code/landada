import { ResponseCode } from "@/enum/ResponseCode";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Grid,
  Image,
  Message,
  Typography,
} from "@arco-design/web-react";
import { Fragment, useEffect, useState } from "react";
import { history, useLocation, useMatch } from "umi";
import "./index.less";
import { getUserAnswerVoById } from "@/servers/api/userAnswerController";
import { appTypeList, scoringStrategyList } from "@/enum/CommonEnum";
import dayjs from "dayjs";
const { Title, Text } = Typography;

export default () => {
  const [loading, setLoading] = useState(false);
  const match = useMatch("/answer/result/:id");
  const id = match?.params.id;
  const [userAnswer, setUserAnswer] = useState<API.UserAnswerVO>();
  const location = useLocation();
  //@ts-ignore
  const appId = location.state?.appId;
  const loadData = async () => {
    setLoading(true);
    let res = await getUserAnswerVoById({ id: id as any });
    if (res.data.code === ResponseCode.SUCCESS) {
      setUserAnswer(res.data.data || {});
    } else {
      Message.error(res.data.message as string);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (!appId) {
      history.back();
    } else {
      loadData();
    }
  }, []);
  return (
    <div className="resultPage">
      <Card bodyStyle={{ padding: 10 }} className="card" loading={loading}>
        <Grid.Row align="center" justify="center">
          <Grid.Col xs={24} md={12} sm={12} style={{ marginBottom: "10px" }}>
            <Descriptions
              column={1}
              title={<Title heading={3}>{userAnswer?.resultName}</Title>}
              data={[
                {
                  label: "结果描述",
                  value: <Fragment>{userAnswer?.resultDesc}</Fragment>,
                },
                {
                  label: "我的答案",
                  value: <Fragment>{userAnswer?.choices}</Fragment>,
                },
                {
                  label: "应用ID",
                  value: <Fragment>{userAnswer?.appId}</Fragment>,
                },
                {
                  label: "应用类型",
                  value: (
                    <Fragment>
                      {
                        appTypeList.find(
                          (item) => item.value === userAnswer?.appType
                        )?.label
                      }
                    </Fragment>
                  ),
                },
                {
                  label: "评分策略",
                  value: (
                    <Fragment>
                      {
                        scoringStrategyList.find(
                          (item) => item.value === userAnswer?.scoringStrategy
                        )?.label
                      }
                    </Fragment>
                  ),
                },
                {
                  label: "答题人",
                  value: (
                    <Fragment>
                      <Avatar>
                        <img alt="avatar" src={userAnswer?.user?.userAvatar} />
                      </Avatar>
                      {userAnswer?.user?.userName}
                    </Fragment>
                  ),
                },
                {
                  label: "答题时间",
                  value: (
                    <Fragment>
                      {dayjs(userAnswer?.createTime).format(
                        "YYYY-MM-DD HH:mm:ss"
                      )}
                    </Fragment>
                  ),
                },
              ]}
              style={{ marginBottom: 20 }}
              labelStyle={{ paddingRight: 36 }}
            />
            <Button onClick={() => history.replace("/")}>返回首页</Button>
          </Grid.Col>
          <Grid.Col xs={24} md={12} sm={12}>
            <Image width={300} src={userAnswer?.resultPicture} alt="icon" />
          </Grid.Col>
        </Grid.Row>
      </Card>
    </div>
  );
};
