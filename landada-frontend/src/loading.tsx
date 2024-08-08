import { Spin } from "@arco-design/web-react";
import global from "@/global.less";
export default () => {
  return <Spin dot className={global.loading} />;
};
