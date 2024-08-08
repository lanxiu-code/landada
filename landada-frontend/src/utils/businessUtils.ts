import { stringify } from "querystring";
import { history } from "umi";

/**
 * 重定向至登录页
 */
export const toLoginPage = () => {
  history.replace({
    pathname: "/user/login",
    search: stringify({
      redirect: window.location.href,
    }),
  });
};
