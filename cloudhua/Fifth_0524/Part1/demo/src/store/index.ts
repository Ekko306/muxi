import { createStore, applyMiddleware, Store } from 'redux'
import initialState, { AppState } from './state';
import reducers from './reducers'
import { tt, cookies } from '../common';

export type Dispatch = (state: AppState) => void;

export interface IAuthHeader {
  "token": string
}

export function connect(dispatch: Dispatch) {
  let state = store.getState();
  dispatch(state);
  return store.subscribe(() => {
    let newSate = store.getState();
    dispatch(newSate);
  })
}

export function verifyAuthInfo(): IAuthHeader {
  let auth = store.getState().auth;
  if (auth && auth.token)
    return { "token": auth.token };
  let token = cookies.get('token')
  tt.verify(token != null, "TokenNotFound");
  return { "token": token };
}

export function getAuthInfo(): IAuthHeader {
  let auth = store.getState().auth;
  if (auth && auth.token)
    return { "token": auth.token };
  let token = cookies.get('token')
  return { "token": token };
}

const store = createStore(reducers);
export default store;