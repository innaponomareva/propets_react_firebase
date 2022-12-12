import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  STOP_LOADING,
  ADD_FOUND,
  GET_ALL_FOUND,
  CLEAR_SUBMIT_SUCCESS,
} from "../types";

const handlers = {
  [ADD_FOUND]: (state, { payload }) => {
    const arr = [...state.found];
    arr.unshift(payload);
    return { ...state, found: arr, submitSuccess: true };
  },
  [GET_ALL_FOUND]: (state, { payload }) => ({ ...state, found: payload }),
  [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [CLEAR_SUBMIT_SUCCESS]: (state) => ({ ...state, submitSuccess: false }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [STOP_LOADING]: (state) => ({ ...state, loading: false }),
  DEFAULT: (state) => state,
};

export const foundReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
