/**
* 用户信息
*/
export interface UserInfo {
  /**
   * 账号
   */
  account: string
  /**
   * 创建时间
   */
  ctime: number
  id: number
  /**
   * 管理员的状态 0：正常；1：删除
   */
  manager_status: number
  /**
   * 昵称
   */
  nickName: string
}
