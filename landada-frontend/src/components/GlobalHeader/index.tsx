import logo from "@/assets/logo.png";
import {
  Typography,
  Space,
  Avatar,
  Grid,
  Image,
  Menu,
  Dropdown,
} from "@arco-design/web-react";
import generateMenu from "@/utils/generateMenu";
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
import "./index.less";
import { useLocation, useModel, useNavigate, history, useAccess } from "umi";
import { useCallback, useEffect, useState } from "react";
import { userLogout } from "@/servers/api/userController";
import { flushSync } from "react-dom";
import { stringify } from "querystring";
import routes from "../../../config/routes";
export default () => {
  const localtion = useLocation();
  const [current, setCurrent] = useState<string[]>([]);
  const { loginUser } = useModel("@@initialState").initialState || {};
  const { initialState, setInitialState } = useModel("@@initialState");
  const navigate = useNavigate();
  const navMenu = generateMenu(routes, loginUser?.userRole as string);
  const onChangeMenuItem = (key: string, event: any, keyPath: string[]) => {
    navigate(key);
  };
  useEffect(() => {
    setCurrent([localtion.pathname]);
  }, [localtion.pathname]);
  const dropList = (
    <Menu
      onClickMenuItem={useCallback(
        async (key: string) => {
          if (key === "/user/logout") {
            flushSync(() => {
              setInitialState((s) => ({ ...s, loginUser: undefined }));
            });
            await userLogout();
            const { search, pathname } = window.location;
            const urlParams = new URL(window.location.href).searchParams;
            /** 此方法会跳转到 redirect 参数所在的位置 */
            const redirect = urlParams.get("redirect");
            if (window.location.pathname !== "/user/login" && !redirect) {
              history.replace({
                pathname: "/user/login",
                search: stringify({
                  redirect: pathname + search,
                }),
              });
            }
            return;
          }
          history.push(key);
        },
        [setInitialState]
      )}
    >
      <Menu.Item key="/user/logout">退出登录</Menu.Item>
    </Menu>
  );
  return (
    <Grid.Row className="globalHeader" align="center">
      <Grid.Col flex={2}>
        <Space direction="horizontal">
          <Image
            width={50}
            footerPosition="outer"
            src={logo}
            className="leftImg"
            alt="bg"
            preview={false}
          />
          {/* <Typography.Ellipsis rows={1} showTooltip style={{ fontSize: 20 }}>
            蓝答答在线测试
          </Typography.Ellipsis> */}
          <Typography.Title
            ellipsis={{ rows: 1, showTooltip: true }}
            style={{ fontSize: 20 }}
          >
            蓝答答在线测试
          </Typography.Title>
        </Space>
      </Grid.Col>
      <Grid.Col flex={8}>
        <div className="menu-demo">
          <Menu
            mode="horizontal"
            selectedKeys={current}
            // defaultSelectedKeys={current}
            onClickMenuItem={onChangeMenuItem}
          >
            {navMenu.map((item: any) => {
              return <MenuItem key={item.path}>{item.name}</MenuItem>;
            })}
          </Menu>
        </div>
      </Grid.Col>
      <Grid.Col flex={1}>
        <Space>
          <Typography.Text>{loginUser?.userName}</Typography.Text>
          <Dropdown droplist={dropList} position="bottom">
            <Avatar size={50}>
              <img src={loginUser?.userAvatar} className="avatar" alt="bg" />
            </Avatar>
          </Dropdown>
        </Space>
      </Grid.Col>
    </Grid.Row>
  );
};
