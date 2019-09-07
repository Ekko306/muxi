import { GetUserInfoResponse } from '../models/Response'
import { http } from '../common';

export function getUserInfo() {
  return http.get<GetUserInfoResponse>(
    '/api/admin/AdminGetUserInfo',
    {}
  )
}
