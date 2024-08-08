import { useState } from "react";
import {
  Tag,
  Button,
  Input,
  Message,
  Space,
  Modal,
  Form,
} from "@arco-design/web-react";
import { IconPlus } from "@arco-design/web-react/icon";
import { addScoringResult } from "@/servers/api/scoringResultController";
import { ResponseCode } from "@/enum/ResponseCode";
import PubSub from "pubsub-js";
const FormItem = Form.Item;
interface Props {
  app: API.AppVO;
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
}
export default (props: Props) => {
  const [tags, setTags] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  function addTag() {
    if (inputValue && tags.length < 1) {
      //@ts-ignore
      tags.push(inputValue);
      setTags(tags);
      setInputValue("");
    }
    setShowInput(false);
  }
  function removeTag(removeTag: any) {
    const newTags = tags.filter((tag) => tag !== removeTag);
    setTags(newTags);
  }
  const onSubmit = async () => {
    try {
      const values = await form.validate();
      //@ts-ignore
      const resultProp = tags[0].split("");
      const res = await addScoringResult({
        ...values,
        appId: props.app.id,
        resultProp: JSON.stringify(resultProp),
      });
      if (res.data.code === ResponseCode.SUCCESS) {
        Message.success("创建成功");
        PubSub.publish("loadScoringResultData");
        props.onOk();
      } else {
        //@ts-ignore
        Message.error(res.data.message);
      }
    } catch (e) {
      Message.error("请完善信息");
    }
  };
  return (
    <div>
      <Modal
        title="创建评分结果"
        visible={props.visible}
        onOk={onSubmit}
        onCancel={props.onCancel}
        autoFocus={false}
        focusLock={true}
        style={{ width: "700px" }}
      >
        <Form
          form={form}
          labelAlign="left"
          style={{ width: 600 }}
          autoComplete="off"
        >
          <FormItem label="应用ID" required>
            <Input disabled value={props.app?.id?.toString()} />
          </FormItem>
          <FormItem
            field="resultName"
            label="结果名称"
            rules={[
              {
                required: true,
                message: "结果名称",
                type: "string",
              },
            ]}
          >
            <Input placeholder="请输入结果名称" />
          </FormItem>
          <FormItem
            field="resultDesc"
            label="结果描述"
            rules={[
              {
                required: true,
                message: "结果描述",
                type: "string",
              },
            ]}
          >
            <Input.TextArea placeholder="请输入结果描述" />
          </FormItem>
          <FormItem
            field="resultPicture"
            label="结果图标"
            rules={[
              {
                required: true,
                message: "结果图标",
                type: "string",
              },
            ]}
          >
            <Input placeholder="请输入结果图标" />
          </FormItem>
          {props.app.appType === 1 && (
            <FormItem
              label="结果集"
              rules={[
                {
                  required: true,
                  message: "结果集",
                  type: "string",
                },
              ]}
            >
              <Space>
                {tags.map((tag, index) => {
                  return (
                    <Tag closable key={tag} onClose={() => removeTag(tag)}>
                      {tag}
                    </Tag>
                  );
                })}
                {showInput ? (
                  <Input
                    autoFocus
                    size="mini"
                    value={inputValue}
                    style={{ width: 84 }}
                    onPressEnter={addTag}
                    onBlur={addTag}
                    onChange={setInputValue}
                  />
                ) : (
                  <Tag
                    icon={<IconPlus />}
                    style={{
                      width: 84,
                      backgroundColor: "var(--color-fill-2)",
                      border: "1px dashed var(--color-fill-3)",
                      cursor: "pointer",
                    }}
                    className="add-tag"
                    tabIndex={0}
                    onClick={() => setShowInput(true)}
                    onKeyDown={(e) => {
                      const keyCode = e.keyCode || e.which;
                      if (keyCode === 13) {
                        // enter
                        setShowInput(true);
                      }
                    }}
                  >
                    Add Tag
                  </Tag>
                )}
              </Space>
            </FormItem>
          )}
          {props.app.appType === 0 && (
            <FormItem
              field="resultScoreRange"
              label="结果得分范围"
              rules={[
                {
                  required: true,
                  message: "结果得分范围",
                  type: "string",
                },
              ]}
            >
              <Input placeholder="请输入结果得分范围" />
            </FormItem>
          )}
        </Form>
      </Modal>
    </div>
  );
};
