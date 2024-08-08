import { AccessEnum } from "@/enum/AccessEnum";

/**
 * @name 权限校验
 */
const checkAccess = (
  currentUser: API.LoginUserVO | undefined,
  needAccess: string[] = [AccessEnum.UN_LOGIN]
) => {
  const userAccess = currentUser?.userRole ?? AccessEnum.UN_LOGIN;
  // 不需要登录就可以访问
  if (needAccess.includes(AccessEnum.UN_LOGIN)) {
    return true;
  }
  if (needAccess.includes(userAccess)) {
    return true;
  }
  return false;
};
export default checkAccess;
