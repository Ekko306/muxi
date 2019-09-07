import { UserInfo } from "../../models"
export class AuthState {
  token: string
  user: UserInfo
}

export class ParamsState {
  menu: string
}

export class AppState {
  auth: AuthState = {
    token: null as any,
    user: null as any
  }
  params: ParamsState = {
    menu: ''
  }
}

const initialState = new AppState();
export default initialState;
