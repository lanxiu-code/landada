import { Drawer, Form, Input } from "@arco-design/web-react";
import { useEffect, useState } from "react";
const FormItem = Form.Item;
interface Props {
  config: {
    visible: boolean;
    record: {};
    onOk: (e: Event) => void;
    onCancel: () => void;
  };
}

export default (props: Props) => {
  const { config } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue(config.record);
  }, [config.record]);
  return (
    <div>
      <Drawer
        width={600}
        title={<span>题目详情</span>}
        visible={config.visible}
        onOk={config.onOk}
        onCancel={config.onCancel}
      >
        <Form
          form={form}
          labelAlign="left"
          style={{ width: 500 }}
          autoComplete="off"
        >
          <FormItem label="ID" field="id">
            <Input placeholder="题目id" />
          </FormItem>
          <FormItem label="题目" field="questionContent">
            <Input.TextArea placeholder="题目" />
          </FormItem>
          <FormItem label="应用ID" field="appId">
            <Input placeholder="应用ID" />
          </FormItem>
          <FormItem label="创建用户ID" field="userId">
            <Input placeholder="创建用户ID" />
          </FormItem>
        </Form>
      </Drawer>
    </div>
  );
};
