import {
  ADD_PET,
  DELETE_PET,
  UPDATE_PET,
  GET_ALL_PETS,
  CLEAR_ERROR,
  SET_ERROR,
  SET_LOADING,
  STOP_LOADING,
  CLEAR_UPDATE_SUCCESS,
} from "../types";

const handlers = {
  [ADD_PET]: (state, { payload }) => {
    const pets = [...state.pets];
    pets.push({
      uid: payload.uid,
      id: payload.id,
      fileNameInStorage: "",
      avatar: "",
      type: "",
      nick: "",
      sex: "",
    });
    return { ...state, pets: pets };
  },

  [DELETE_PET]: (state, { payload }) => {
    //console.log("payload", payload);
    const pets = [...state.pets];
    const newPets = pets.filter((item) => item.id !== payload.id);
    return { ...state, pets: newPets };
  },

  [UPDATE_PET]: (state, { payload }) => {
    //console.log("payload", payload);
    const pets = [...state.pets];
    const index = pets.findIndex((item) => item.id === payload.id);
    pets[index] = { ...payload };
    return { ...state, pets: pets, updateSuccess: true };
  },

  [GET_ALL_PETS]: (state, { payload }) => {
    return { ...state, pets: [...payload] };
  },
  [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [CLEAR_UPDATE_SUCCESS]: (state) => ({ ...state, updateSuccess: false }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [STOP_LOADING]: (state) => ({ ...state, loading: false }),
  DEFAULT: (state) => state,
};

export const petReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
