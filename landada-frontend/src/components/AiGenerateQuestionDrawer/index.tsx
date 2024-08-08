import { ResponseCode } from "@/enum/ResponseCode";
import { aiGenerateQuestion } from "@/servers/api/aiController";
import {
  Form,
  Drawer,
  InputNumber,
  Typography,
  Radio,
  Message,
  Notification,
  Input,
} from "@arco-design/web-react";
import { useState } from "react";
import PubSub from "pubsub-js";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
interface Props {
  appId: number;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}
export default (props: Props) => {
  const [appForm] = Form.useForm();
  const [realTime, setRealTime] = useState<string>("2");
  const submit = async () => {
    try {
      await appForm.validate();
      let appTemp = appForm.getFieldsValue();
      props.onOk();
      Notification.info({ content: "正在生成，请稍等" });
      if (realTime === "1") {
        let res = await aiGenerateQuestion({
          appId: props.appId,
          ...appTemp,
        });
        if (res.data.code === ResponseCode.SUCCESS) {
          Notification.success({ content: "题目生成成功", duration: 1500 });
          PubSub.publish("addQuestionList", res.data.data);
        } else {
          Message.error(res.data.message as string);
        }
      } else {
        // 创建SSE请求
        const eventSource = new EventSource(
          `http://127.0.0.1:8101/api/ai/generate/sse?appId=${props.appId}&questionNum=${appTemp.questionNum}&optionNum=${appTemp.optionNum}`,
          { withCredentials: true }
        );
        // 接收消息
        eventSource.onmessage = (event) => {
          const data = JSON.parse(event.data);
          PubSub.publish("addQuestionList", data);
        };
        // 生成结束，关闭连接
        eventSource.onerror = (event) => {
          if (event.eventPhase === EventSource.CLOSED) {
            Notification.success({ content: "题目生成成功", duration: 1500 });
            eventSource.close();
          } else {
            eventSource.close();
          }
        };
      }
    } catch (e) {
      Message.error("请完善信息");
    }
  };
  return (
    <div>
      <Drawer
        width={600}
        title={<span>AI 题目生成 </span>}
        visible={props.visible}
        onOk={submit}
        onCancel={props.onCancel}
      >
        <Form
          form={appForm}
          labelAlign="left"
          style={{ width: 500 }}
          autoComplete="off"
        >
          <FormItem
            label="题目数量"
            field="questionNum"
            rules={[
              {
                required: true,
                message: "题目数量",
                type: "number",
              },
            ]}
          >
            <InputNumber placeholder="题目数量" min={0} max={20} />
          </FormItem>
          <FormItem
            label="选项数量"
            field="optionNum"
            rules={[
              {
                required: true,
                message: "选项数量",
                type: "number",
              },
            ]}
          >
            <InputNumber placeholder="选项数量" min={0} max={4} />
          </FormItem>
        </Form>
        <RadioGroup
          defaultValue="2"
          style={{ marginBottom: 20 }}
          onChange={(value: any) => {
            setRealTime(value);
          }}
        >
          <Radio value="1">普通生成</Radio>
          <Radio value="2">实时生成</Radio>
        </RadioGroup>
      </Drawer>
    </div>
  );
};
