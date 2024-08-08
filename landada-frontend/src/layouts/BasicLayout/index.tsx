import { Layout, Anchor, BackTop } from "@arco-design/web-react";
import GlobalFooter from "@/components/GlobalFooter";
import GlobalHeader from "@/components/GlobalHeader";
const AnchorLink = Anchor.Link;
import "./index.less";
import { Outlet } from "umi";
import { IconCaretUp } from "@arco-design/web-react/icon";
const Header = Layout.Header;
const Footer = Layout.Footer;
const Content = Layout.Content;

export default () => {
  return (
    <Layout className="basicLayout">
      <Header className="lan-header">
        <GlobalHeader />
      </Header>
      <Content className="lan-content">
        <Outlet />
      </Content>
      <Footer className="lan-footer">
        <GlobalFooter />
      </Footer>
      <BackTop
        easing="linear"
        duration={200}
        style={{
          position: "absolute",
          right: 60,
          bottom: 60,
        }}
        visibleHeight={30}
      >
        <div
          className="custom-backtop"
          tabIndex={0}
          role="button"
          aria-label="scroll to top"
        >
          <IconCaretUp />
          <br />
          TOP
        </div>
      </BackTop>
    </Layout>
  );
};
