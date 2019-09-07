import initialState, { AppState, AuthState, ParamsState} from "../state";
import { combineReducers } from "redux";
import { AuthActions, ParamsActions } from "../types";
import { tt, cookies, log } from "../../common";

let reducers = combineReducers<AppState>({
  auth(state: AuthState = initialState.auth, action: AuthActions): AuthState {
    switch (action.type) {
      case '@auth/login': {
        let { user, token } = action.payload;
        log.d("login handled:", action.payload);
        // cookies.put("token", token);token是直接存进去的；
        return { ...state, ...action.payload };
      }
      case '@auth/update': {
        return { ...state, ...action.payload };
      }
      case '@auth/user/update': {
        let { user } = state;
        log.d("login user:", user);
        state.user = { ...user, ...action.payload };

        return state;
      }
      case '@auth/logout': {
        cookies.remove('token')
        cookies.remove('phone')
        cookies.remove('checked')
        return { ...state, user: null as any, token: null as any };
      }
      default: return state;
    }
  },
  params(state: ParamsState = initialState.params, action: ParamsActions): ParamsState {
    switch (action.type) {
      case '@params/update': {
        return { ...state, ...action.payload }
      }
      case '@params/update/menu': {
        return { ...state, ...action.payload }
      }
      default: return state;
    }
  }
})

export default reducers;
