import { getLoginUser } from "@/servers/api/userController";
import { useEffect, useState } from "react";

export default function User() {
  const [loginUser, setLoginUser] = useState<API.LoginUserVO>({});
  const [loading, setLoading] = useState(true);
  const fetchLoginUser = async () => {
    let res = await getLoginUser();
    if (res.data.code === 0 && res.data.data) {
      setLoginUser(res.data.data);
    }
    setLoading(false);
  };
  // 清空登录信息
  const clearLoginUser = () => {
    setLoginUser({});
  };
  return { loginUser, loading, fetchLoginUser, clearLoginUser };
}
