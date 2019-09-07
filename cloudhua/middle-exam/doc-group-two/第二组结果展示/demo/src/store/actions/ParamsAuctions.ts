import { ActionCreator } from "redux";
import { UpdateParamsAction, updatePramasPayload, updateMenuAction, updateMenuPayload } from "../types";
import { UserInfo } from "../../models";

export const updateParams: ActionCreator<UpdateParamsAction> = (payload: updatePramasPayload) => ({
  type: "@params/update",
  payload: payload || {} as updatePramasPayload
});

export const updateMenu: ActionCreator<updateMenuAction> = (menu: string) => ({
  type: "@params/update/menu",
  payload: { menu } || {} as updateMenuPayload
});
