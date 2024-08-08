import { Steps } from "@arco-design/web-react";
import "./index.less";
const Step = Steps.Step;
interface Props {
  current: number;
  prefix: string;
}
export default (props: Props) => {
  return (
    <div className="customStep">
      <Steps direction="vertical" current={props.current}>
        <Step id={1} title={props.prefix + "应用"} description="填写应用信息" />
        <Step id={2} title={props.prefix + "题目"} description="填写题目信息" />
        <Step
          id={3}
          title={props.prefix + "评分"}
          description="填写评分结果信息"
        />
      </Steps>
    </div>
  );
};
