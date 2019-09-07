import { } from '../models'

export interface LoginRequest {
  username: string
  password: string
}

export interface SearchBaseRequest {
  pageIndex?: number
  pageSize?: number
  /**
 * 排序字段-默认值: ctime
 */
  sort?: string
  /**
 * 排序规则（asc与desc）-默认值: desc
 */
  order?: string
}

/**
 * 蒐索商品
 */
export interface SearchRequest extends SearchBaseRequest {
  keyword: string
}