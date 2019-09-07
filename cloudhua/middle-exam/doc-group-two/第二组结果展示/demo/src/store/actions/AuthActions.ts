import { ActionCreator } from "redux";
import { LoginAction, UpdateAuthAction, AuthInfoPayload, UpdateUserAction, UserInfoPayload, LogoutAction } from "../types";
import { UserInfo } from "../../models";


export const login: ActionCreator<LoginAction> = (token: string, user: UserInfo) => ({
  type: "@auth/login",
  payload: {
    token,
    user
  }
});

export function updateUserInfo(payload: UserInfoPayload): UpdateUserAction {
  return {
    type: "@auth/user/update",
    payload: payload
  }
};

export const updateAuthInfo: ActionCreator<UpdateAuthAction> = (payload: AuthInfoPayload) => ({
  type: "@auth/update",
  payload: payload || {} as AuthInfoPayload
});

export const logout: ActionCreator<LogoutAction> = () => ({
  type: "@auth/logout",
  payload: {}
});