import { Order1 } from "../services"
import { tt, cookies } from "../common"
import store from "../Store"
import { login } from "../store/actions"

export async function getOrderInfo(type:string) {
  let res = await Order1.getOrderInfo(type)
  if (tt.checkStat(res)) {
    if (cookies.has('checked') && cookies.get('checked') == 'true') {
      cookies.put('token', cookies.get('token'), 7)
    }
  }
  return res
}
