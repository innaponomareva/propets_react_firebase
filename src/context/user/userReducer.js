import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  STOP_LOADING,
  ADD_USER,
  UPDATE_USER,
  GET_ALL_USERS,
  LOGIN,
  LOGOUT,
  CLEAR_UPDATE_SUCCESS,
} from "../types";

const handlers = {
  [ADD_USER]: (state, { payload }) => {
    const users = [...state.users];
    users.push({
      uid: payload.uid,
      name: payload.name,
      email: payload.email,
      avatar: "",
      type: "",
      nick: "",
      phone: "",
      photo: "",
      avatarNameInStorage: "",
      photoNameInStorage: "",
    });
    return { ...state, users: users };
  },
  [LOGIN]: (state) => ({ ...state, authSuccess: true }),
  [LOGOUT]: (state) => ({ ...state, authSuccess: false }),
  [UPDATE_USER]: (state, { payload }) => {
    //console.log("payload", payload);
    const users = [...state.users];
    const index = users.findIndex((item) => item.uid === payload.uid);
    users[index] = { ...payload };
    return { ...state, users: users, updateSuccess: true };
  },

  [GET_ALL_USERS]: (state, { payload }) => {
    return { ...state, users: [...payload] };
  },
  [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [CLEAR_UPDATE_SUCCESS]: (state) => ({ ...state, updateSuccess: false }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [STOP_LOADING]: (state) => ({ ...state, loading: false }),
  DEFAULT: (state) => state,
};

export const userReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
