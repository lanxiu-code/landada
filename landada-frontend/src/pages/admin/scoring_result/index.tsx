import withAuth from "@/hocs/withAuth";
import {
  Button,
  Message,
  Space,
  Table,
  Input,
  Divider,
  Popconfirm,
  Image,
  Typography,
  TableColumnProps,
} from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";
import { ResponseCode } from "@/enum/ResponseCode";
import "./index.less";

import dayjs from "dayjs";
import {
  deleteScoringResult,
  listScoringResultVoByPage,
} from "@/servers/api/scoringResultController";
const InputSearch = Input.Search;
const { Text } = Typography;
export default withAuth(() => {
  const tableRef = useRef(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [searchParams, setSearchParams] =
    useState<API.ScoringResultQueryRequest>({
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
      width: 100,
      align: "center",
      render: (_, record) => (
        <Space>
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
    let res = await deleteScoringResult({ id });
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
    let res = await listScoringResultVoByPage(searchParams);
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
    <div className="scoring_result">
      <Space>
        <Text>结果名称</Text>
        <Input
          allowClear
          size="large"
          value={searchParams.resultName}
          placeholder="结果名称"
          style={{ width: 300 }}
          onChange={(value) =>
            setSearchParams({ ...searchParams, resultName: value })
          }
        />
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
        <Button loading={searchLoading} type="primary" onClick={loadData}>
          搜索
        </Button>
      </Space>
      <Divider />
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
    </div>
  );
});
