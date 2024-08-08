import {
  Input,
  Space,
  List,
  Avatar,
  Divider,
  Card,
  Typography,
  Message,
} from "@arco-design/web-react";
import {
  IconThumbUp,
  IconShareInternal,
  IconMore,
} from "@arco-design/web-react/icon";
import withAuth from "@/hocs/withAuth";
import { useEffect, useState } from "react";
import "./index.less";
import { listAppVoByPage } from "@/servers/api/appController";
import { ResponseCode } from "@/enum/ResponseCode";
import { history } from "umi";
import ShareModal from "@/components/ShareModal";
const InputSearch = Input.Search;
const { Meta } = Card;
export default withAuth(() => {
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchParams, setSearchParams] = useState<API.AppQueryRequest>({
    pageSize: 8,
    current: 1,
  });
  const [shareVisible, setShareVisible] = useState(false);
  const [shareModalConfig, setShareModalConfig] = useState({
    title: "分享",
    link: "",
  });
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 8,
    current: 1,
    pageSizeChangeResetCurrent: false,
    hideOnSinglePage: true,
    onChange: (current: number, pageSize: number) => {
      setSearchParams({
        ...searchParams,
        current,
        pageSize,
      });
    },
  });
  const [dataSource, setDataSource] = useState([]);
  const loadData = async () => {
    let res = await listAppVoByPage(searchParams);
    setSearchLoading(true);
    if (res.data.code === ResponseCode.SUCCESS) {
      //@ts-ignore
      setDataSource(res.data.data.records);
      setPagination({
        ...pagination,
        pageSize: searchParams.pageSize as number,
        current: searchParams.current as number,
        //@ts-ignore
        total: res.data.data.total,
      });
    } else {
      Message.error(res.data.message as string);
    }
    setSearchLoading(false);
  };
  useEffect(() => {
    loadData();
  }, [searchParams.current, searchParams.pageSize]);
  return (
    <div className="home">
      <InputSearch
        searchButton="搜索"
        loading={searchLoading}
        placeholder="搜索应用"
        size="large"
        allowClear
        value={searchParams.appName}
        onChange={(value) =>
          setSearchParams({ ...searchParams, appName: value })
        }
        style={{ width: 300 }}
        onSearch={loadData}
      />
      <Divider />
      <List
        className="list-demo-action-layout"
        bordered={false}
        hoverable
        pagination={{ ...pagination }}
        grid={{
          sm: 24,
          md: 12,
          lg: 8,
          xl: 6,
        }}
        dataSource={dataSource}
        render={(app: API.AppVO, index) => (
          <List.Item
            key={app.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: 10,
            }}
            actionLayout="vertical"
          >
            <Card
              className="card-with-icon-hover"
              style={{ width: 290 }}
              onClick={() => {
                history.push(`/app/detail/${app.id}`, { app });
              }}
              cover={
                <div style={{ height: 150, overflow: "hidden" }}>
                  <img
                    style={{
                      width: "100%",
                      transform: "translateY(-50px)",
                    }}
                    alt="appIcon"
                    src={app.appIcon}
                  />
                </div>
              }
              actions={[
                // <span className="icon-hover">
                //   <IconThumbUp />
                // </span>,
                <span className="icon-hover">
                  <IconShareInternal
                    onClick={(e) => {
                      e.stopPropagation();
                      setShareModalConfig({
                        title: app?.appName as string,
                        link: `${window.location.origin}/app/detail/${app?.id}`,
                      });
                      setShareVisible(true);
                    }}
                  />
                </span>,
                // <span className="icon-hover">
                //   <IconMore />
                // </span>,
              ]}
            >
              <Meta
                avatar={
                  <Space>
                    <Avatar size={24}>
                      <img alt="avatar" src={app.user?.userAvatar} />
                    </Avatar>
                    <Typography.Text>{app.user?.userName}</Typography.Text>
                  </Space>
                }
                title={app.appName}
                description={app.appDesc}
              />
            </Card>
          </List.Item>
        )}
      />
      <ShareModal
        visible={shareVisible}
        {...shareModalConfig}
        onOk={() => setShareVisible(false)}
        onCancel={() => setShareVisible(false)}
      />
    </div>
  );
});
