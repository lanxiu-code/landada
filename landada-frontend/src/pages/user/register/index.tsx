import { Form, Input, Button, Message } from "@arco-design/web-react";
import "./index.less";
import { useEffect, useRef } from "react";
import { userRegister } from "@/servers/api/userController";
import { ResponseCode } from "@/enum/ResponseCode";
import { history, useAccess, useNavigate } from "umi";
import { Card } from "@arco-design/web-react";

const FormItem = Form.Item;
export default () => {
  const navigate = useNavigate();
  const formRef = useRef<any>(null);
  const onRegister = async (loginInfo: API.UserRegisterRequest) => {
    try {
      let res = await userRegister(loginInfo);
      if (res.data.code === ResponseCode.SUCCESS) {
        navigate("/user/login", { replace: true });
        Message.success("注册成功");
      } else {
        Message.error("注册失败," + res.data.message);
      }
    } catch (e) {
      Message.error("注册失败");
    }
  };
  return (
    <div className="registerPage">
      <Card hoverable bordered={false}>
        <h1 className="title">蓝答答-注册</h1>
        <Form
          ref={formRef}
          style={{ width: 320 }}
          wrapperCol={{ span: 24 }}
          labelAlign="left"
          labelCol={{ span: 10 }}
          autoComplete="off"
          onValuesChange={(v, vs) => {
            console.log(v, vs);
          }}
          onSubmit={(data) => {
            onRegister(data);
          }}
        >
          <FormItem
            field="userAccount"
            label="账号"
            rules={[{ required: true, message: "账号是必填项" }]}
          >
            <Input placeholder="创建账号" />
          </FormItem>
          <FormItem
            field="userPassword"
            label="密码"
            rules={[{ required: true, message: "密码是必填项" }]}
          >
            <Input.Password placeholder="请输入密码" />
          </FormItem>
          <FormItem
            field="checkPassword"
            label="确认密码"
            dependencies={["userPassword"]}
            rules={[
              {
                validator: (v, cb) => {
                  if (!v) {
                    return cb("确认密码必填");
                  } else if (
                    formRef.current.getFieldValue("userPassword") !== v
                  ) {
                    return cb("两次密码不相等");
                  }
                  cb(null);
                },
              },
              { required: true, message: "请确认密码" },
            ]}
          >
            <Input.Password placeholder="再次输入密码" />
          </FormItem>
          <FormItem
            extra={
              <Button
                size="mini"
                type="text"
                onClick={() => {
                  navigate("/user/login", { replace: true });
                }}
              >
                已有账号，去登陆
              </Button>
            }
          >
            <Button type="primary" htmlType="submit" long>
              注册
            </Button>
          </FormItem>
        </Form>
      </Card>
    </div>
  );
};
