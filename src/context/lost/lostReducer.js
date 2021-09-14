import { SET_ERROR, CLEAR_ERROR,
         SET_LOADING,STOP_LOADING, 
         ADD_LOST, GET_ALL_LOST, 
 } from "../types";

 

const handlers = {
[ADD_LOST]: (state, {payload}) => {
  const arr = [...state.lost];
  arr.unshift(payload);
  return {...state, lost: arr}
},
[GET_ALL_LOST]: (state, {payload}) => ({...state, lost: payload}),
[SET_ERROR]: (state, {payload}) => ({...state, error: payload}),
[CLEAR_ERROR]: state => ({...state, error: null}),
[SET_LOADING]: state => ({...state, loading: true}),
[STOP_LOADING]: state => ({...state, loading: false}),
DEFAULT: (state) => state
}

export const lostReducer = (state, action) => {
const handler = handlers[action.type] || handlers.DEFAULT;
return handler(state, action);
}