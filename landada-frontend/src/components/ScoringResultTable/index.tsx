import {
  Button,
  Form,
  Grid,
  Image,
  Input,
  Message,
  Popconfirm,
  Select,
  Space,
  Table,
  TableColumnProps,
} from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import {
  deleteScoringResult,
  listMyScoringResultVoByPage,
} from "@/servers/api/scoringResultController";
import { ResponseCode } from "@/enum/ResponseCode";
import PubSub from "pubsub-js";
interface Props {
  app: API.AppVO;
}
export default (props: Props) => {
  const tableRef = useRef(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [pagination, setPagination] = useState({
    sizeCanChange: true,
    showTotal: true,
    total: 0,
    pageSize: 10,
    current: 1,
    pageSizeChangeResetCurrent: true,
  });
  const [searchParams, setSearchParams] =
    useState<API.ScoringResultQueryRequest>({
      pageSize: 10,
      current: 1,
      appId: props.app?.id,
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
      title: "名称",
      dataIndex: "resultName",
      align: "center",
      ellipsis: true,
      width: 150,
    },
    {
      title: "结果描述",
      dataIndex: "resultDesc",
      align: "center",
      ellipsis: true,
      width: 200,
    },
    {
      title: "结果图片",
      dataIndex: "resultPicture",
      align: "center",
      ellipsis: true,
      width: 100,
      render: (_, record) => (
        <Image width={50} height={50} src={record.resultPicture} />
      ),
    },
    {
      title: "结果属性",
      dataIndex: "resultProp",
      align: "center",
      ellipsis: true,
      width: 150,
    },
    {
      title: "得分范围",
      dataIndex: "resultScoreRange",
      align: "center",
      ellipsis: true,
      width: 150,
    },
    {
      title: "应用ID",
      dataIndex: "appId",
      align: "center",
      ellipsis: true,
      width: 150,
    },
    {
      title: "创建用户ID",
      dataIndex: "userId",
      align: "center",
      ellipsis: true,
      width: 150,
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
      width: 150,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button type="secondary" size="mini">
            修改
          </Button>
          <Popconfirm
            focusLock
            title="确定要删除吗?"
            onOk={() => onDeleteScoringResult(record.id)}
          >
            <Button type="secondary" size="mini" status="danger">
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
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
    let res = await listMyScoringResultVoByPage(searchParams);
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
  };
  const onDeleteScoringResult = async (id: number) => {
    let res = await deleteScoringResult({ id });
    if (res.data.code === ResponseCode.SUCCESS) {
      Message.success("删除成功");
      loadData();
    } else {
      Message.error(res.data.message as string);
    }
  };
  PubSub.subscribe("loadScoringResultData", loadData);
  useEffect(() => {
    loadData();
  }, [searchParams.current, searchParams.pageSize]);
  return (
    <Table
      scroll={{ x: 1000, y: true }}
      loading={tableLoading}
      pagination={pagination}
      ref={tableRef}
      columns={columns}
      data={formData}
      rowKey={(record) => record.id}
      onChange={onChangeTable}
    />
  );
};
