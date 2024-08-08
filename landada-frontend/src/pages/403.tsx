import { Result, Button } from "@arco-design/web-react";
export default () => {
  return (
    <div>
      <Result
        status="403"
        subTitle="抱歉，你没有权限"
        style={{ marginTop: "20%" }}
      ></Result>
    </div>
  );
};
