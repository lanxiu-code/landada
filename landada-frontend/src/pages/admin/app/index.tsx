import withAuth from "@/hocs/withAuth";
import {
  Button,
  Message,
  Space,
  Table,
  Input,
  Divider,
  Modal,
  Popconfirm,
  Form,
  Tag,
  Select,
  Grid,
  Image,
  TableColumnProps,
  Typography,
} from "@arco-design/web-react";
import dayjs from "dayjs";
import { Fragment, useEffect, useRef, useState } from "react";
import { ResponseCode } from "@/enum/ResponseCode";
import "./index.less";
import {
  deleteApp,
  doAppReview,
  listAppByPage,
} from "@/servers/api/appController";
import {
  appTypeList,
  reviewStatusList,
  scoringStrategyList,
} from "@/enum/CommonEnum";
const InputSearch = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const { Title, Paragraph, Text } = Typography;
export default withAuth(() => {
  const tableRef = useRef(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [reviewForm] = Form.useForm();
  const [appInfoForm] = Form.useForm();
  const [appData, setAppData] = useState<API.AppVO>();
  const [searchParams, setSearchParams] = useState<API.AppQueryRequest>({
    pageSize: 10,
    current: 1,
  });
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const TagColor = ["orangered", "green", "red"];
  const columns: TableColumnProps[] = [
    {
      title: "id",
      dataIndex: "id",
      fixed: "left",
      width: 100,
      align: "center",
    },
    {
      title: "应用名",
      dataIndex: "appName",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "应用描述",
      dataIndex: "appDesc",
      align: "center",
      width: 150,
      ellipsis: true,
    },
    {
      title: "应用图标",
      dataIndex: "appIcon",
      align: "center",
      width: 150,
      ellipsis: true,
      render: (_, record) => (
        <Image width={50} height={50} src={record.appIcon} />
      ),
    },
    {
      title: "应用类型",
      dataIndex: "appType",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (_, record) => (
        //@ts-ignore
        <>{appTypeList.find((item) => item.value == record.appType).label}</>
      ),
    },
    {
      title: "评分策略",
      dataIndex: "scoringStrategy",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (_, record) => (
        <>
          {
            //@ts-ignore
            scoringStrategyList.find(
              (item) => item.value == record.scoringStrategy
            ).label
          }
        </>
      ),
    },
    {
      title: "审核状态",
      dataIndex: "reviewStatus",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (_, record) => (
        <Tag color={TagColor[record.reviewStatus]}>
          {
            //@ts-ignore
            reviewStatusList.find((item) => item.value == record.reviewStatus)
              .label
          }
        </Tag>
      ),
    },
    {
      title: "审核信息",
      dataIndex: "reviewMessage",
      align: "center",
      ellipsis: true,
      width: 150,
      render: (_, record) => (
        <Fragment>
          {record.reviewMessage && (
            <Text type="secondary">{record.reviewMessage}</Text>
          )}
          {!record.reviewMessage && <Text type="secondary">未审核</Text>}
        </Fragment>
      ),
    },
    {
      title: "审核人ID",
      dataIndex: "reviewerId",
      align: "center",
      ellipsis: true,
      width: 200,
      render: (_, record) => (
        <Fragment>
          {record.reviewerId && (
            <Text type="secondary">{record.reviewerId}</Text>
          )}
          {!record.reviewerId && <Text type="secondary">未审核</Text>}
        </Fragment>
      ),
    },
    {
      title: "审核时间",
      dataIndex: "reviewTime",
      align: "center",
      ellipsis: true,
      width: 180,
      render: (_, record) => (
        <Fragment>
          {record.reviewTime &&
            dayjs(record.reviewTime).format("YYYY-MM-DD HH:mm:ss")}
          {!record.reviewTime && <Text type="secondary">未审核</Text>}
        </Fragment>
      ),
    },
    {
      title: "创建用户",
      dataIndex: "userId",
      align: "center",
      ellipsis: true,
      width: 180,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      ellipsis: true,
      width: 180,
      render: (_, record) => (
        <div>{dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      align: "center",
      ellipsis: true,
      width: 180,
      render: (_, record) => (
        <div>{dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: "操作",
      dataIndex: "op",
      fixed: "right",
      align: "center",
      width: 150,
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setAppData(record);
              appInfoForm.setFieldsValue(record);
              reviewForm.setFieldsValue(record);
              setModalVisible(true);
            }}
            type="secondary"
            size="mini"
            status="default"
          >
            审核
          </Button>
          <Popconfirm
            focusLock
            title="确定要删除吗?"
            onOk={() => {
              //@ts-ignore
              onDeleteApp(record.id);
            }}
          >
            <Button type="secondary" status="danger" size="mini">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onDeleteApp = async (id: number) => {
    let res = await deleteApp({ id });
    if (res.data.code === ResponseCode.SUCCESS) {
      //@ts-ignore
      setFormData(formData.filter((item) => item.id != id));
      Message.success("删除成功");
    } else {
      Message.error(res.data.message as string);
    }
  };
  const onChangeTable = (pagination: any) => {
    const { current, pageSize } = pagination;
    setTableLoading(true);
    setSearchParams({
      ...searchParams,
      current,
      pageSize,
    });
    setPagination({ ...pagination, current, pageSize });
    setTableLoading(false);
  };
  const loadData = async () => {
    let res = await listAppByPage(searchParams);
    setSearchLoading(true);
    if (res.data.code === ResponseCode.SUCCESS) {
      //@ts-ignore
      setFormData(res.data.data.records);
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
  }, [
    searchParams.current,
    searchParams.pageSize,
    searchParams.appType,
    searchParams.scoringStrategy,
    searchParams.reviewStatus,
  ]);
  return (
    <div className="app">
      <Space>
        <InputSearch
          allowClear
          size="large"
          value={searchParams.appName}
          searchButton="search"
          loading={searchLoading}
          placeholder="应用名"
          style={{ width: 300 }}
          onChange={(value) =>
            setSearchParams({ ...searchParams, appName: value })
          }
          onSearch={loadData}
        />
        <Select
          addBefore="应用类型"
          placeholder="选择应用类型"
          style={{ width: 250 }}
          size="large"
          value={searchParams.appType}
          onChange={(value) =>
            setSearchParams({ ...searchParams, appType: value })
          }
        >
          {appTypeList.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Select
          addBefore="评分策略"
          placeholder="选择评分策略"
          style={{ width: 250 }}
          size="large"
          value={searchParams.scoringStrategy}
          onChange={(value) =>
            setSearchParams({ ...searchParams, scoringStrategy: value })
          }
        >
          {scoringStrategyList.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Select
          addBefore="审核状态"
          placeholder="选择审核状态"
          style={{ width: 250 }}
          size="large"
          value={searchParams.reviewStatus}
          onChange={(value) =>
            setSearchParams({ ...searchParams, reviewStatus: value })
          }
        >
          {reviewStatusList.map((item, index) => (
            <Option key={index} value={item.value}>
              {item.label}
            </Option>
          ))}
        </Select>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            setSearchParams({ pageSize: 10, current: 1 });
          }}
        >
          清空筛选条件
        </Button>
      </Space>
      <Divider />
      <Table
        stripe
        scroll={{
          x: true,
          y: true,
        }}
        loading={tableLoading}
        pagination={pagination}
        ref={tableRef}
        columns={columns}
        data={formData}
        rowKey={(record) => record.id}
        onChange={onChangeTable}
      />
      <Modal
        title="审核应用"
        visible={modalVisible}
        style={{ width: "70vw" }}
        onOk={() => {
          reviewForm
            .validate()
            .then(async (value) => {
              let res = await doAppReview({
                appId: appData?.id,
                reviewStatus: value.reviewStatus,
                reviewMessage: value.reviewMessage,
              });
              if (res.data.code === ResponseCode.SUCCESS) {
                Message.success("审核成功");
                loadData();
                setModalVisible(false);
              } else {
                Message.error(res.data.message as string);
              }
            })
            .catch(() => {
              Message.error("请填写完整信息");
            });
        }}
        onCancel={() => setModalVisible(false)}
        autoFocus={false}
        focusLock={true}
      >
        <Grid.Row align="start">
          <Grid.Col flex={1}>
            <Title
              heading={3}
              type="secondary"
              style={{ margin: "0 0 10px 0", textAlign: "center" }}
            >
              应用信息
            </Title>
            <Form
              form={appInfoForm}
              initialValues={appData}
              labelAlign="right"
              style={{ width: 500 }}
              autoComplete="off"
            >
              <FormItem disabled field="id" label="id">
                <Input placeholder="id" />
              </FormItem>
              <FormItem disabled field="appName" label="应用名">
                <Input placeholder="应用名" />
              </FormItem>
              <FormItem disabled field="appDesc" label="应用描述">
                <Input placeholder="应用描述" />
              </FormItem>
              <FormItem disabled field="appIcon" label="应用图标">
                <Image width={100} src={appData?.appIcon} alt="appIcon" />
              </FormItem>
              <FormItem disabled field="appType" label="应用类型">
                <Tag size="large" color="cyan">
                  得分类
                </Tag>
              </FormItem>
              <FormItem disabled field="scoringStrategy" label="评分策略">
                <Tag size="large" color="purple">
                  AI
                </Tag>
              </FormItem>
            </Form>
          </Grid.Col>
          <Grid.Col flex={1}>
            <Title
              heading={3}
              type="secondary"
              style={{ margin: "0 0 10px 0", textAlign: "center" }}
            >
              审核信息
            </Title>
            <Form
              form={reviewForm}
              initialValues={appData}
              labelAlign="right"
              style={{ width: 500 }}
              autoComplete="off"
            >
              <FormItem
                field="reviewStatus"
                label="审核状态"
                rules={[
                  {
                    required: true,
                    message: "审核状态必填",
                    type: "string",
                  },
                ]}
              >
                <Select placeholder="Select city" style={{ width: 154 }}>
                  {reviewStatusList.map((item, index) => (
                    <Option
                      key={item.value}
                      disabled={index === 3}
                      value={item.value}
                    >
                      {item.label}
                    </Option>
                  ))}
                </Select>
              </FormItem>
              <FormItem
                field="reviewMessage"
                label="审核信息"
                rules={[
                  {
                    required: true,
                    message: "请填写审核信息",
                    type: "string",
                    min: 0,
                    max: 80,
                  },
                ]}
              >
                <Input.TextArea maxLength={80} placeholder="审核信息" />
              </FormItem>
            </Form>
          </Grid.Col>
        </Grid.Row>
      </Modal>
    </div>
  );
});
