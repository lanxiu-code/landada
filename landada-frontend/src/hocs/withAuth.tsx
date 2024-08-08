import { useAccess, useAppData, useLocation, matchRoutes, useModel } from "umi";
import { Watermark } from "@arco-design/web-react";
import checkAccess from "@/utils/auth";
import NoPermission from "@/components/403";
const loginPath = "/user/login";
const registerPath = "/user/register";
/**
 * 高阶组件-路由拦截
 * @param Component
 * @returns
 */
export default (Component: React.ReactNode | any) => () => {
  const { loginUser } = useModel("@@initialState").initialState || {};
  const appData = useAppData();
  const localtion = useLocation();
  const route = matchRoutes(appData.clientRoutes, localtion.pathname)?.pop()
    ?.route;
  // @ts-ignore
  const auth = checkAccess(loginUser, route?.meta?.access);
  const access = useAccess();
  const currentHref = window.location.href;
  // 已登录或已在登录页，直接展示内容
  if (auth || currentHref.indexOf(loginPath) > -1) {
    return (
      <Watermark
        content="蓝答答"
        fontStyle={{
          fontWeight: "lighter",
          color: "#efefef52",
          fontSize: "30px",
        }}
      >
        <Component />
      </Watermark>
    );
  } else {
    return <NoPermission />;
  }
};
