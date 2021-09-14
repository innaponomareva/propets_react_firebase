import { LOGIN, LOGOUT, SET_ERROR, CLEAR_ERROR, SET_LOADING, STOP_LOADING } from "../types";

const handlers = {
  [LOGIN]: state => ({...state, authSuccess: true}),
  [LOGOUT]: state => ({...state, authSuccess: false}),
  [SET_ERROR]: (state, {payload}) => ({...state, error: payload}),
  [CLEAR_ERROR]: state => ({...state, error: null}),
  [SET_LOADING]: state => ({...state, loading: true}),
  [STOP_LOADING]: state => ({...state, loading: false}),
  DEFAULT: (state) => state
}

export const authReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
  }
