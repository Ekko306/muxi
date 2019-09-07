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

export interface OrderRequest {
  type: string,
  start_time?: number,
  end_time?: number,
  order_status?: number,
  orderNumberKeyword?: string,
  auctionKeyword?: string,
  userKeyword?: string,
  marketKeyword?: string,
  // shopKeyword?: string,
  // pageIndex?: number,
  // pageSize?: number,
  // sort?: string,
  // order?: string,
}