import { GetUserInfoResponse } from '../models/Response'
import { http } from '../common';

export function getUserInfo() {
  return http.post<GetUserInfoResponse>(
    '/api/user/getUserInfo',
    {}
  )
}