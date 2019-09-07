import { Action } from 'redux';
import { UserInfo } from "../../models";


export interface updatePramasPayload {
  menu: string
}

export interface updateMenuPayload {
  menu: string
}

export interface UpdateParamsAction extends Action {
  type: '@params/update',
  payload: updatePramasPayload
}

export interface updateMenuAction extends Action {
  type: '@params/update/menu',
  payload: updateMenuPayload
}


export type ParamsActions = UpdateParamsAction | updateMenuAction
