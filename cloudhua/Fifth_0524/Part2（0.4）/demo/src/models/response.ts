import { } from '../models'
import { UserInfo } from './user'
import { JSONResponse } from '../common';

export interface BaseResponse extends JSONResponse {

}


export interface LoginResponse extends BaseResponse {
  token?: string
}

export interface GetUserInfoResponse extends BaseResponse{
  user: UserInfo
}