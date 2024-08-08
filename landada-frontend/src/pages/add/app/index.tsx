import {
  Button,
  Form,
  Grid,
  Input,
  Message,
  Select,
  Typography,
} from "@arco-design/web-react";
import "./index.less";
import CustomStep from "@/components/CustomStep";
import { appTypeList, scoringStrategyList } from "@/enum/CommonEnum";
import { history, useLocation } from "umi";
import { addApp, updateApp } from "@/servers/api/appController";
const { Title } = Typography;
const FormItem = Form.Item;
const Option = Select.Option;
export default () => {
  const [appForm] = Form.useForm();
  const location = useLocation();
  //@ts-ignore
  let app = (location.state?.app as API.AppVO) || {};
  const saveApp = async () => {
    try {
      await appForm.validate();
      let appTemp = appForm.getFieldsValue();
      Object.assign(app, appTemp);
      let res = null;
      if (app?.id) {
        res = await updateApp(app);
      } else {
        res = await addApp(app);
        app.id = res.data.data as any;
      }
      history.push("/add/question", {
        app,
      });
    } catch (e) {
      console.log(e);
      Message.error({
        content: "请完善信息",
        showIcon: true,
      });
    }
  };
  return (
    <div className="addAppPage">
      <Grid.Row align="start" justify="space-around">
        <Grid.Col xs={24} md={3}>
          <CustomStep prefix={!app?.id ? "创建" : "修改"} current={1} />
        </Grid.Col>
        <Grid.Col xs={24} md={19}>
          <Title heading={3}>{!app?.id ? "创建" : "修改"}应用</Title>
          <Form
            form={appForm}
            labelAlign="left"
            style={{ width: 450 }}
            autoComplete="off"
            initialValues={app}
          >
            <FormItem
              label="应用名称"
              field="appName"
              rules={[
                {
                  required: true,
                  message: "输入应用名称",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="输入应用名称" />
            </FormItem>
            <FormItem
              label="应用描述"
              field="appDesc"
              rules={[
                {
                  required: true,
                  message: "输入应用描述",
                  type: "string",
                },
              ]}
            >
              <Input.TextArea placeholder="输入应用描述" />
            </FormItem>
            <FormItem
              label="应用图标"
              field="appIcon"
              rules={[
                {
                  required: true,
                  message: "输入应用图标",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="输入应用图标" />
            </FormItem>
            <FormItem
              label="应用类型"
              field="appType"
              rules={[
                {
                  required: true,
                  message: "选择应用类型",
                  type: "number",
                },
              ]}
            >
              <Select placeholder="选择应用类型" style={{ width: 154 }}>
                {appTypeList.map((item, index) => (
                  <Option key={index} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
            <FormItem
              label="评分策略"
              field="scoringStrategy"
              rules={[
                {
                  required: true,
                  message: "选择评分策略",
                  type: "number",
                },
              ]}
            >
              <Select placeholder="选择评分策略" style={{ width: 154 }}>
                {scoringStrategyList.map((item, index) => (
                  <Option key={index} value={item.value}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </FormItem>
          </Form>
          <Button onClick={saveApp} type="primary" style={{ width: "200px" }}>
            提交
          </Button>
        </Grid.Col>
      </Grid.Row>
    </div>
  );
};
