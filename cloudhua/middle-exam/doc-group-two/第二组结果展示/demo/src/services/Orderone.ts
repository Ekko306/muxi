import { OrderResponse,OrderRequest } from '../models'
import { http } from '../common';


/**
 * 用户登录
 * @param phone
 * @param pwd
 */
export function getOrderInfo(data:OrderRequest) {
  return http.post<OrderResponse,OrderRequest>('/api/order/AdminSearchOrders',
  data)
}
