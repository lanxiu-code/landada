/**
 * @description 权限枚举
 */
export enum AccessEnum {
  /**
   * 管理员
   */
  ADMIN = "admin",

  /**
   * 普通用户
   */
  USER = "user",
  /**
   * VIP用户
   */
  VIP = "vip",
  /**
   * 封禁用户
   */
  BAN = "ban",

  /**
   * 未登录
   */
  UN_LOGIN = "un_login",
}

/**
 *
 * 角色枚举
 */
export const userRoleList = [
  {
    label: "管理员",
    value: AccessEnum.ADMIN,
  },
  {
    label: "普通用户",
    value: AccessEnum.USER,
  },
  {
    label: "封禁用户",
    value: AccessEnum.BAN,
  },
];
