// 响应码枚举
export enum ResponseCode {
  SUCCESS = 0, // 成功
  ERROR = 1, // 失败
  UNAUTHORIZED = 40100, // 未登录
  FORBIDDEN = 40300, // 无权限
  NOT_FOUND = 40400, // 未过审
  SERVER_ERROR = 50000, // 服务器错误
  SERVER_TIMEOUT = 504, // 服务器响应超时
  BAD_REQUEST = 40000, // 请求错误
}
