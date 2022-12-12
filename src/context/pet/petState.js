import React, { useCallback, useReducer } from "react";
import {
  addPet_fb,
  deletePet_fb,
  getAllPets_fb,
  updatePet_fb,
} from "../../service/petService";
import {
  ADD_PET,
  UPDATE_PET,
  GET_ALL_PETS,
  CLEAR_ERROR,
  SET_ERROR,
  SET_LOADING,
  STOP_LOADING,
  DELETE_PET,
  CLEAR_UPDATE_SUCCESS,
} from "../types";
import { PetContext } from "./petContext";
import { petReducer } from "./petReducer";

export const PetState = ({ children }) => {
  const initialState = {
    pets: [],
    updateSuccess: false,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(petReducer, initialState);
  const { pets, updateSuccess, error, loading } = state;

  //console.log("pets__state", pets);

  async function addPet({ uid, id }) {
    setLoading();
    clearError();
    try {
      await addPet_fb({ uid, id });
      setAddPet({ uid, id });
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  async function deletePet(id, fileNameInStorage) {
    setLoading();
    clearError();
    try {
      await deletePet_fb(id, fileNameInStorage);
      setDeletePet(id);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  async function updatePet(update) {
    setLoading();
    clearError();
    try {
      await updatePet_fb(update);
      setUpdatePet(update);
      setTimeout(() => clearUpdateSuccess(), 3000);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  const getAllPets = useCallback(async () => {
    clearError();
    setLoading();
    try {
      const response = await getAllPets_fb();
      setGetAllPets(response);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }, []);

  // Actions:

  const setAddPet = ({ uid, id }) =>
    dispatch({ type: ADD_PET, payload: { uid, id } });
  const setDeletePet = (id) => dispatch({ type: DELETE_PET, payload: { id } });
  const setUpdatePet = (update) =>
    dispatch({ type: UPDATE_PET, payload: { ...update } });
  const setGetAllPets = (data) =>
    dispatch({ type: GET_ALL_PETS, payload: data });

  const setLoading = () => dispatch({ type: SET_LOADING });
  const stopLoading = () => dispatch({ type: STOP_LOADING });
  const setError = (message) => dispatch({ type: SET_ERROR, payload: message });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const clearUpdateSuccess = () => dispatch({ type: CLEAR_UPDATE_SUCCESS });

  return (
    <PetContext.Provider
      value={{
        pets,
        error,
        loading,
        updateSuccess,
        getAllPets,
        updatePet,
        deletePet,
        addPet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
