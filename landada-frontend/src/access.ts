import { AccessEnum } from "./enum/AccessEnum";

export default function access(initialState: {
  loginUser: API.LoginUserVO | undefined;
}) {
  const { loginUser } = initialState || {};
  return {
    canUser: !!loginUser,
    canAdmin: loginUser && loginUser.userRole === AccessEnum.ADMIN,
    canBan: loginUser && loginUser.userRole === AccessEnum.BAN,
  };
}
