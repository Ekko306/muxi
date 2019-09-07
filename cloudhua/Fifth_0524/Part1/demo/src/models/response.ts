import { } from '../models'
import { UserInfo } from './user'
import { JSONResponse } from '../common'

export interface LoginResponse extends JSONResponse {
  token?: string
}

export interface GetUserInfoResponse extends JSONResponse{
  data:{
    user: UserInfo
  }
}

export interface ListResponse extends JSONResponse{
  data:{
    total: string,
    list: any
  }
}


export interface BaseResponse extends JSONResponse {

}
