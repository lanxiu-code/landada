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
  Drawer,
  Form,
  Select,
  Image,
  TableColumnProps,
} from "@arco-design/web-react";
import { useEffect, useRef, useState } from "react";
import {
  deleteUser,
  listUserByPage,
  updateUser,
} from "@/servers/api/userController";
import { ResponseCode } from "@/enum/ResponseCode";
import { AccessEnum, userRoleList } from "@/enum/AccessEnum";
import "./index.less";
import dayjs from "dayjs";
const InputSearch = Input.Search;
const FormItem = Form.Item;
const Option = Select.Option;
const options = ["Beijing", "Shanghai", "Guangzhou", "Disabled"];
export default withAuth(() => {
  const tableRef = useRef(null);
  const [tableLoading, setTableLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [formData, setFormData] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [form] = Form.useForm();
  const [updateData, setUpdateData] = useState<API.UserUpdateRequest>();
  const [searchParams, setSearchParams] = useState<API.UserQueryRequest>({
    pageSize: 10,
    current: 1,
    userName: "",
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
      title: "id",
      dataIndex: "id",
      fixed: "left",
      width: 200,
      align: "center",
    },
    {
      title: "账号",
      dataIndex: "userAccount",
      align: "center",
      ellipsis: true,
    },
    {
      title: "用户名",
      dataIndex: "userName",
      align: "center",
      ellipsis: true,
    },
    {
      title: "头像",
      dataIndex: "userAvatar",
      align: "center",
      ellipsis: true,
      render: (_, record) => (
        <Image width={50} height={50} src={record.userAvatar} />
      ),
    },
    {
      title: "用户简介",
      dataIndex: "userProfile",
      align: "center",
      ellipsis: true,
    },
    {
      title: "角色",
      dataIndex: "userRole",
      align: "center",
      ellipsis: true,
      render: (_, record) => (
        <Space>
          {/* @ts-ignore */}
          {userRoleList.find((item) => item.value == record.userRole).label}
        </Space>
      ),
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
          <Button
            onClick={() => {
              form.setFieldsValue({ ...record, userPassword: null });
              // setUpdateData({ ...record, userPassword: null });
              setDrawerVisible(true);
            }}
            type="secondary"
            size="mini"
          >
            编辑
          </Button>
          <Popconfirm
            focusLock
            title="确定要删除吗?"
            onOk={() => {
              //@ts-ignore
              onDeleteUser(record.id);
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

  const onDeleteUser = async (id: number) => {
    let res = await deleteUser({ id });
    if (res.data.code === ResponseCode.SUCCESS) {
      //@ts-ignore
      setFormData(formData.filter((item) => item.id != record.id));
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
    setSearchLoading(true);
    let res = await listUserByPage(searchParams);
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
  const onValuesChange = (
    changeValue: API.UserLoginRequest,
    allValue: API.UserLoginRequest
  ) => {
    setUpdateData(allValue);
  };
  useEffect(() => {
    loadData();
  }, [searchParams.current, searchParams.pageSize]);
  return (
    <div className="user">
      <div className="search">
        <InputSearch
          allowClear
          size="large"
          value={searchParams.userName}
          searchButton="Search"
          loading={searchLoading}
          placeholder="搜索用户"
          style={{ width: 300 }}
          onChange={(value) =>
            setSearchParams({ ...searchParams, userName: value })
          }
          onSearch={loadData}
        />
      </div>
      <Divider />
      <Table
        scroll={{ x: true, y: true }}
        loading={tableLoading}
        pagination={pagination}
        ref={tableRef}
        columns={columns}
        data={formData}
        rowKey={(record) => record.id}
        onChange={onChangeTable}
      />
      <Drawer
        width={500}
        title={<span>编辑用户 </span>}
        visible={drawerVisible}
        onOk={async () => {
          let res = await updateUser(updateData as API.UserUpdateRequest);
          if (res.data.code === ResponseCode.SUCCESS) {
            loadData();
            Message.success("修改成功");
          } else {
            Message.error(res.data.message as string);
          }

          setDrawerVisible(false);
        }}
        onCancel={() => {
          setDrawerVisible(false);
        }}
      >
        <Form
          form={form}
          labelAlign="left"
          style={{ width: 400 }}
          autoComplete="off"
          onValuesChange={onValuesChange}
          initialValues={updateData}
        >
          <FormItem label="账号" field="userAccount">
            <Input placeholder="请输入账号" />
          </FormItem>
          <FormItem label="密码" field="userPassword">
            <Input placeholder="修改密码" />
          </FormItem>
          <FormItem label="昵称" field="userName">
            <Input placeholder="请输入昵称" />
          </FormItem>
          <FormItem label="简介" field="userProfile">
            <Input.TextArea placeholder="填写简介" />
          </FormItem>
          <FormItem label="权限" field="userRole">
            <Select placeholder="设置用户权限" style={{ width: 154 }}>
              {userRoleList.map((item, index) => (
                <Option key={index} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </FormItem>
        </Form>
      </Drawer>
    </div>
  );
});
