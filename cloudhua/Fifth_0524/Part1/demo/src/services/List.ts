import { LoginRequest } from '../models/Request'
import { LoginResponse,ListResponse } from '../models/Response'
import { JSONResponse } from '../common'
import { http } from '../common';

/**
 * 用户登录
 * @param phone
 * @param pwd
 */
export function getList(phone: string) {
  return http.get<ListResponse>('/api/list', {
    phone,
  })
}