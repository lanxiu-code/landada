import { history, useLocation, useMatch, useModel } from "umi";
import "./index.less";
import { Fragment, useEffect, useMemo, useState } from "react";
import {
  Message,
  Card,
  Typography,
  Descriptions,
  Grid,
  Image,
  Button,
  Space,
} from "@arco-design/web-react";
import { getAppVoById } from "@/servers/api/appController";
import { ResponseCode } from "@/enum/ResponseCode";
import { appTypeList, scoringStrategyList } from "@/enum/CommonEnum";
import dayjs from "dayjs";
import withAuth from "@/hocs/withAuth";
import ShareModal from "@/components/ShareModal";
const { Title } = Typography;

export default withAuth(() => {
  const match = useMatch("/app/detail/:id");
  const appId = match?.params.id;
  const [appInfo, setAppInfo] = useState<API.AppVO>();
  const [loading, setLoading] = useState(false);
  const { loginUser } = useModel("@@initialState").initialState || {};
  const [shareVisible, setShareVisible] = useState(false);
  const location = useLocation();
  //@ts-ignore
  const app = location.state?.app as API.AppVO;
  const isMe = useMemo(() => {
    return loginUser?.id === appInfo?.userId;
  }, [appInfo]);
  const loadData = async () => {
    setLoading(true);
    let res = await getAppVoById({ id: appId as any });
    if (res.data.code === ResponseCode.SUCCESS) {
      setAppInfo(res.data.data);
    } else {
      Message.error(res.data.message as string);
    }
    setLoading(false);
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="detailPage">
      <Card
        loading={loading}
        className="card"
        bordered={false}
        title={<Title heading={3}>{appInfo?.appName}</Title>}
      >
        <Grid.Row>
          <Grid.Col span={12}>
            <Descriptions
              column={1}
              colon=" :"
              size="large"
              title="应用信息"
              data={[
                {
                  label: "应用类型",
                  value: (
                    <Fragment>
                      {appTypeList[appInfo?.appType || 0].label}
                    </Fragment>
                  ),
                },
                {
                  label: "评分策略",
                  value: (
                    <Fragment>
                      {scoringStrategyList[appInfo?.scoringStrategy || 0].label}
                    </Fragment>
                  ),
                },
                {
                  label: "作者",
                  value: appInfo?.user?.userName,
                },
                {
                  label: "创建时间",
                  value: (
                    <Fragment>
                      {dayjs(appInfo?.updateTime).format("YYYY-MM-DD HH:mm:ss")}
                    </Fragment>
                  ),
                },
              ]}
              style={{ marginBottom: 20 }}
              labelStyle={{ paddingRight: 10, textAlign: "right" }}
            />
            <Grid.Row align="center">
              <Grid.Col span={24} style={{ marginBottom: "10px" }}>
                <Space>
                  <Button
                    onClick={() => {
                      history.push(`/answer/do/${appId}`, {
                        appInfo,
                      });
                    }}
                    type="primary"
                  >
                    开始答题
                  </Button>
                  <Button onClick={() => setShareVisible(true)}>
                    分享应用
                  </Button>
                </Space>
              </Grid.Col>
              <Grid.Col span={24} style={{ marginBottom: "10px" }}>
                {isMe && (
                  <Fragment>
                    <Space>
                      <Button
                        onClick={() => history.push("/add/question", { app })}
                      >
                        设置题目
                      </Button>
                      <Button
                        onClick={() =>
                          history.push("/add/scoring_result", { app })
                        }
                      >
                        设置评分
                      </Button>
                      <Button onClick={() => history.push("/add/app", { app })}>
                        修改应用
                      </Button>
                    </Space>
                  </Fragment>
                )}
              </Grid.Col>
            </Grid.Row>
          </Grid.Col>
          <Grid.Col
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
            span={12}
            sm={24}
            md={12}
            lg={8}
            xl={6}
          >
            <Image width={300} src={appInfo?.appIcon} alt="appIcon" />
          </Grid.Col>
        </Grid.Row>
      </Card>
      <ShareModal
        visible={shareVisible}
        title={appInfo?.appName as string}
        link={window.location.href}
        onOk={() => setShareVisible(false)}
        onCancel={() => setShareVisible(false)}
      />
    </div>
  );
});
