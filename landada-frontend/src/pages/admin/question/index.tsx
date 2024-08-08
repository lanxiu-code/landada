import withAuth from "@/hocs/withAuth";
import {
  Button,
  Message,
  Space,
  Table,
  Input,
  Divider,
  Popconfirm,
  Typography,
  TableColumnProps,
} from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";
import { ResponseCode } from "@/enum/ResponseCode";
import "./index.less";
import {
  deleteQuestion,
  listQuestionVoByPage,
} from "@/servers/api/questionController";
import dayjs from "dayjs";
import QuestionDrawer from "./components/questionDrawer";
const InputSearch = Input.Search;
const { Text } = Typography;
export default withAuth(() => {
  const tableRef = useRef(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [drawerConfig, setDrawerConfig] = useState({
    visible: false,
    record: {},
    onOk: () => {
      setDrawerConfig({ ...drawerConfig, visible: false });
    },
    onCancel: () => {
      setDrawerConfig({ ...drawerConfig, visible: false });
    },
  });
  const [searchParams, setSearchParams] = useState<API.QuestionQueryRequest>({
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
  const columns: TableColumnProps[] = [
    {
      title: "ID",
      dataIndex: "id",
      fixed: "left",
      width: 200,
      align: "center",
    },
    {
      title: "题目",
      dataIndex: "questionContent",
      align: "center",
      ellipsis: true,
    },
    {
      title: "应用ID",
      dataIndex: "appId",
      align: "center",
      ellipsis: true,
    },
    {
      title: "创建用户ID",
      dataIndex: "userId",
      align: "center",
      ellipsis: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      align: "center",
      ellipsis: true,
      render: (_, record) => (
        <div>{dayjs(record.createTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: "更新时间",
      dataIndex: "updateTime",
      align: "center",
      ellipsis: true,
      render: (_, record) => (
        <div>{dayjs(record.updateTime).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: "操作",
      dataIndex: "op",
      fixed: "right",
      width: 200,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => {
              setDrawerConfig({ ...drawerConfig, visible: true, record });
            }}
            type="secondary"
            size="mini"
          >
            查看
          </Button>
          <Popconfirm
            focusLock
            title="确定要删除吗?"
            onOk={() => {
              //@ts-ignore
              onDeleteQuestion(record.id);
            }}
          >
            <Button type="secondary" size="mini" status="danger">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onDeleteQuestion = async (id: number) => {
    let res = await deleteQuestion({ id });
    if (res.data.code === ResponseCode.SUCCESS) {
      Message.success("删除成功");
      //@ts-ignore
      setFormData(formData.filter((item) => item.id != id));
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
    setSearchLoading(true);
    let res = await listQuestionVoByPage(searchParams);
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
  }, [searchParams.current, searchParams.pageSize]);
  return (
    <div className="question">
      <Space>
        <Text>应用ID</Text>
        <Input
          allowClear
          size="large"
          value={searchParams.appId?.toString()}
          placeholder="应用ID"
          style={{ width: 300 }}
          onChange={(value) =>
            setSearchParams({ ...searchParams, appId: Number(value) })
          }
        />
        <Text>用户ID</Text>
        <Input
          allowClear
          size="large"
          value={searchParams.userId?.toString()}
          placeholder="用户ID"
          style={{ width: 300 }}
          onChange={(value) =>
            setSearchParams({ ...searchParams, userId: Number(value) })
          }
        />
        <Button type="primary" loading={searchLoading} onClick={loadData}>
          搜索
        </Button>
      </Space>
      <Divider />
      <Table
        loading={tableLoading}
        pagination={pagination}
        ref={tableRef}
        columns={columns}
        data={formData}
        rowKey={(record) => record.id}
        onChange={onChangeTable}
      />
      <QuestionDrawer config={drawerConfig} />
    </div>
  );
});
