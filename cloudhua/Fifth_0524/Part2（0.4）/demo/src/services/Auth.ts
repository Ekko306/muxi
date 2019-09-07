import { LoginRequest } from '../models/Request'
import { BaseResponse, LoginResponse } from '../models/Response'
import { http } from '../common';

/**
 * 用户登录
 * @param phone
 * @param pwd
 */
export function login(phone: string, pwd: string) {
  return http.post<LoginResponse, LoginRequest>('/api/user/adminLogin', {
    phone,
    pwd
  })
}

/**
 * 注销登录
 */
export function logout() {
  return http.post<BaseResponse>('/api/user/adminLogout',{})
}