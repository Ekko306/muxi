import { User } from "../services"
import { tt, cookies } from "../common"
import store from "../Store"
import { login } from "../store/actions"

export async function getUserInfo() {
  let res = await User.getUserInfo()
  if (res.result == 'ok') {
    store.dispatch(login(cookies.get('token'), res.user))
    if (cookies.has('checked') && cookies.get('checked') == 'true') {
      cookies.put('token', cookies.get('token'), 7)
    }
  }
  return res
}