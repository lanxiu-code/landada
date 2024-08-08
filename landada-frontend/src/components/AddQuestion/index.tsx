import {
  Button,
  Form,
  Input,
  Grid,
  Typography,
  Space,
  InputNumber,
  Divider,
  Message,
} from "@arco-design/web-react";
import "./index.less";
import { IconDelete } from "@arco-design/web-react/icon";
import { Fragment, useRef, useState } from "react";
const { Title, Text } = Typography;

interface Props {
  app: API.AppVO;
  nextIndex: number;
  onCancel: () => void;
  onOk: (values: any) => void;
}
interface Question {
  options: any[];
  title: string;
}
export default (props: Props) => {
  const [question, setQuestion] = useState<Question>({
    title: "",
    options: [],
  });
  const [isBlur, setIsBlur] = useState(false);
  console.log(props);

  return (
    <div>
      <Grid.Row align="center">
        <Grid.Col span={1} style={{ textAlign: "center" }}>
          <span>{props.nextIndex + 1}.</span>
        </Grid.Col>
        <Grid.Col span={5}>
          {!isBlur && (
            <Input
              autoFocus
              value={question?.title}
              placeholder="请输入题目标题"
              onChange={(val) => {
                //@ts-ignore
                setQuestion({ ...question, title: val });
              }}
              onBlur={(e) => {
                if (!e.target.value) {
                  return;
                }
                setIsBlur(true);
              }}
            />
          )}
          {isBlur && (
            <Text onClick={() => setIsBlur(false)}>{question?.title}</Text>
          )}
        </Grid.Col>
      </Grid.Row>
      <Divider />
      <Form
        autoComplete="off"
        labelAlign="left"
        style={{ marginLeft: "20px" }}
        labelCol={{ span: 1.5, offset: 0 }}
        initialValues={question.options}
        onValuesChange={(_, allValues) => {
          setQuestion({
            ...question,
            //@ts-ignore
            options: allValues.options,
          });
        }}
      >
        <Form.List field="options">
          {(fields, { add, remove, move }) => {
            return (
              <Fragment>
                {fields.map((item, index) => {
                  return (
                    <Fragment key={item.key}>
                      <Form.Item label={`选项${index + 1}`}>
                        <Space>
                          <Form.Item
                            field={item.field + ".key"}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input placeholder="选项Key" />
                          </Form.Item>
                          <Form.Item
                            field={item.field + ".value"}
                            rules={[{ required: true }]}
                            noStyle
                          >
                            <Input placeholder="设置选项值" />
                          </Form.Item>
                          {props.app.appType === 1 && (
                            <Form.Item
                              field={item.field + ".result"}
                              rules={[{ required: true }]}
                              noStyle
                            >
                              <Input placeholder="设置结果" />
                            </Form.Item>
                          )}
                          {props.app.appType === 0 && (
                            <Form.Item
                              field={item.field + ".score"}
                              rules={[{ required: true }]}
                              noStyle
                            >
                              <InputNumber
                                min={0}
                                max={10}
                                placeholder="设置分数"
                              />
                            </Form.Item>
                          )}
                          <Button
                            icon={<IconDelete />}
                            shape="circle"
                            status="danger"
                            onClick={() => remove(index)}
                          ></Button>
                        </Space>
                      </Form.Item>
                    </Fragment>
                  );
                })}
                <Form.Item wrapperCol={{ offset: 0 }}>
                  <Space>
                    <Button
                      onClick={() => {
                        if (question.options.length < 5) {
                          add();
                        } else {
                          Message.info("最多添加5个选项");
                        }
                      }}
                    >
                      添加选项
                    </Button>
                    <Button onClick={() => props.onOk(question)} type="primary">
                      保存数据
                    </Button>
                    <Button onClick={props.onCancel}>取消操作</Button>
                  </Space>
                </Form.Item>
              </Fragment>
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
};
