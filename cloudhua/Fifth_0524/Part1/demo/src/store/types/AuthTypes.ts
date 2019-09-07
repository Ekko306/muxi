import { Action } from 'redux';
import { UserInfo } from "../../models";

export interface AuthInfoPayload {
  token?: string
  user?: UserInfo
}

export interface UserInfoPayload extends UserInfo {
  
}

export interface LoginAction extends Action {
  type: '@auth/login';
  payload: {
    token: string,
    user: UserInfo
  }
}

export interface UpdateAuthAction extends Action {
  type: '@auth/update';
  payload: AuthInfoPayload
}

export interface UpdateUserAction extends Action {
  type: "@auth/user/update";
  payload: UserInfoPayload
}

export interface LogoutAction extends Action {
  type: '@auth/logout';
  payload: {}
}

export type AuthActions = LoginAction | LogoutAction | UpdateAuthAction | UpdateUserAction;