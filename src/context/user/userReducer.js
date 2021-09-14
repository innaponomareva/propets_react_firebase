import { SET_ERROR, CLEAR_ERROR, 
         SET_LOADING,STOP_LOADING, 
         ADD_USER, UPDATE_USER, GET_USER, 
         GET_ALL_USERS 
        } from "../types";

const handlers = {
  [ADD_USER]: (state, {payload}) => {
    const temp = [...state.users];
    temp.push(payload);
    return {...state, users: temp }
  },
  [UPDATE_USER]: (state, {payload}) => {
    const users = [...state.users];
    const index = users.findIndex(item => item.uid === payload.uid);
    users[index] = {...payload};
    return {...state, users: users}
  },
  [GET_USER]: (state, {payload}) => {
    const users = [...state.users];
    const user = users.find(item => item.uid === payload);
    //console.log('user', user)
    return {...state, user: user}
  },
  [GET_ALL_USERS]: (state, {payload}) => {
    //console.log('users', payload)
    return {...state, users: [...payload]}
  },
  [SET_ERROR]: (state, {payload}) => ({...state, error: payload}),
  [CLEAR_ERROR]: state => ({...state, error: null}),
  [SET_LOADING]: state => ({...state, loading: true}),
  [STOP_LOADING]: state => ({...state, loading: false}),
  DEFAULT: (state) => state
}

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}
