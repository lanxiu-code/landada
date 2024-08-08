import {
  Form,
  Input,
  Button,
  Message,
  Tooltip,
  Notification,
} from "@arco-design/web-react";
import { Grid } from "@arco-design/web-react";
import "./index.less";
import { useEffect, useRef, useState } from "react";
import { userLogin } from "@/servers/api/userController";
import { ResponseCode } from "@/enum/ResponseCode";
import { useLocation, useModel, useNavigate, history, useAccess } from "umi";
import { Card } from "@arco-design/web-react";
const FormItem = Form.Item;
export default () => {
  const { initialState, setInitialState } = useModel("@@initialState");
  const navigate = useNavigate();
  const localtion = useLocation();
  const redirect = new URLSearchParams(localtion.search).get("redirect");
  const formRef = useRef<any>(null);
  const [loginInfo, setLoginInfo] = useState<API.UserLoginRequest>({
    userAccount: "admin",
    userPassword: "12345678",
  });
  const onValuesChange = (
    changeValue: API.UserLoginRequest,
    allValue: API.UserLoginRequest
  ) => {
    setLoginInfo(allValue);
  };
  const onSubmit = async () => {
    try {
      await formRef.current.validate();
      let res = await userLogin(loginInfo);
      if (res.data.code === ResponseCode.SUCCESS) {
        setInitialState({ loginUser: res.data.data });
        if (redirect && redirect?.startsWith("http")) {
          window.location.href = redirect;
        } else {
          history.replace(redirect ? redirect : "/");
        }
        Notification.success({
          title: "登录成功",
          content: `${res.data.data?.userName},欢迎回来`,
          duration: 1000,
        });
      } else {
        //@ts-ignore
        Notification.error({ content: res.data.message, duration: 1000 });
      }
    } catch (e) {
      Message.error("登录失败");
    }
  };
  return (
    <div className="loginPage">
      <Card hoverable bordered={false}>
        <h1 className="title">蓝答答-用户登录</h1>
        <Form
          ref={formRef}
          size="large"
          layout="vertical"
          style={{ width: 300 }}
          autoComplete="off"
          initialValues={loginInfo}
          onValuesChange={onValuesChange}
        >
          <FormItem
            label="账号"
            field="userAccount"
            rules={[
              {
                required: true,
                message: "账号必填",
                type: "string",
                min: 0,
                max: 20,
              },
            ]}
            tooltip={<Tooltip>在此输入你的账号</Tooltip>}
          >
            <Input placeholder="请输入账号" />
          </FormItem>
          <FormItem
            label="密码"
            field="userPassword"
            rules={[
              {
                required: true,
                message: "密码必填",
                type: "string",
                min: 0,
                max: 20,
              },
            ]}
            tooltip={<Tooltip>在此输入你的密码</Tooltip>}
          >
            <Input.Password placeholder="请输入密码" />
          </FormItem>
          <FormItem>
            <Grid.Row align="center" justify="space-between">
              <Button className="subBtn" type="primary" onClick={onSubmit}>
                登录
              </Button>
              <Button
                className="subBtn"
                type="dashed"
                onClick={() => {
                  navigate("/user/register", { replace: true });
                }}
              >
                注册
              </Button>
            </Grid.Row>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};
