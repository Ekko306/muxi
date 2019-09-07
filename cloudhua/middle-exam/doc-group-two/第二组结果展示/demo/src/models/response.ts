import {BreakItem2 } from '../models'
import { UserInfo } from './user'
import { JSONResponse } from '../common'
import { BreakItem } from './BreakItem';


export interface LoginResponse extends JSONResponse {
  token?: string
}

export interface GetUserInfoResponse extends JSONResponse {
  item: UserInfo
}

export interface OrderResponse extends JSONResponse {
      total: number,
      items: any
}