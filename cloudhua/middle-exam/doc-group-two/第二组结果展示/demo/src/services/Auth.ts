import { LoginRequest } from '../models/Request'
import { LoginResponse } from '../models/Response'
import { JSONResponse } from '../common'
import { http } from '../common';

/**
 * 用户登录
 * @param name
 * @param pwd
 */
export function login(name: string, pwd: string) {
  return http.get<LoginResponse, LoginRequest>('/api/admin/AdminLogin', {
    name,
    pwd
  })
}