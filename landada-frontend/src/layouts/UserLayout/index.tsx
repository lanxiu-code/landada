import { Link, Outlet } from "umi";
import { Grid, Space, Typography } from "@arco-design/web-react";
import { Image } from "@arco-design/web-react";
import "./index.less";
import login_left from "@/assets/login_left.jpg";
const Row = Grid.Row;
const Col = Grid.Col;
export default () => {
  return (
    <div className="userLayout">
      <Row style={{ height: "100%" }} align="center">
        <Col
          className="leftContent"
          sm={12}
          xs={24}
          style={{
            height: "100%",
          }}
        >
          <Space
            direction="vertical"
            align="center"
            style={{ padding: "20px" }}
          >
            <Image
              width={window.innerWidth / 3}
              footerPosition="outer"
              src={login_left}
              className="leftImg"
              alt="bg"
              preview={false}
            />
            <Typography.Text type="secondary">
              答题升级，智慧加速！🚀加入智能测评平台，每一题都是成长的契机。精准评估，快速进步，让学习变得更简单高效。立即体验，开启你的智慧之旅！
            </Typography.Text>
          </Space>
        </Col>
        <Col sm={12} xs={24}>
          <Outlet />
        </Col>
      </Row>
    </div>
  );
};
