import { matchRoutes } from "umi";
import { getLoginUser } from "./servers/api/userController";
import "@arco-design/web-react/dist/css/arco.css";
import { toLoginPage } from "./utils/businessUtils";

export async function getInitialState() {
  try {
    const initialData = await getLoginUser();
    return { loginUser: initialData.data.data };
  } catch (e) {
    toLoginPage();
    return {};
  }
}
//@ts-ignore
export function onRouteChange({ clientRoutes, location }) {
  const route = matchRoutes(clientRoutes, location.pathname)?.pop()?.route;
  if (route) {
    //@ts-ignore
    document.title = "蓝答答-" + route?.meta?.title || "在线测试";
  }
}
