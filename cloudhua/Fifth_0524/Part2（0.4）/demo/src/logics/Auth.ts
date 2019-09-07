import { Auth } from "../services"
import { tt, cookies } from "../common"
import store from "../Store"
import { logout } from "../store/actions"
import { user } from "."

export async function login(phone: string, pwd: string, isChecked: boolean = true) {
  let res = await Auth.login(phone, pwd)
  if (res.result == 'ok') {
    if (isChecked) {
      cookies.put('phone', phone, 7)
      cookies.put('token', res.token, 7)
      cookies.put('checked', isChecked + '', 365)
    }
    else {
      cookies.put('token', res.token)
      cookies.put('checked', isChecked + '', 365)
    }
    await user.getUserInfo()
  }
  return res
}

export async function userLogout() {
  let res = await Auth.logout()
  store.dispatch(logout())
  return res
}