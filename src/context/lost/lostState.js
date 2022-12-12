import React, { useCallback, useReducer } from "react";
import { addLost_fb, getAllLost_fb } from "../../service/lostService";
import {
  CLEAR_ERROR,
  CLEAR_SUBMIT_SUCCESS,
  SET_ERROR,
  SET_LOADING,
  STOP_LOADING,
  GET_ALL_LOST,
  ADD_LOST,
} from "../types";
import { LostContext } from "./lostContext";
import { lostReducer } from "./lostReducer";

export const LostState = ({ children }) => {
  const initialState = {
    lost: [],
    submitSuccess: false,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(lostReducer, initialState);
  const { lost, submitSuccess, error, loading } = state;

  //console.log("lostState", lost);

  const getAllLost = useCallback(async () => {
    clearError();
    setLoading();
    try {
      const response = await getAllLost_fb();
      setGetAllLost(response);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      stopLoading();
    }
  }, []);

  const addLost = async (post) => {
    clearSubmitSuccess();
    clearError();
    setLoading();
    try {
      await addLost_fb(post);
      setAddLost(post);
      setTimeout(() => clearSubmitSuccess(), 3000);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  };

  // Actions:
  const setGetAllLost = (data) =>
    dispatch({ type: GET_ALL_LOST, payload: data });
  const setAddLost = (post) => dispatch({ type: ADD_LOST, payload: post });

  const setLoading = () => dispatch({ type: SET_LOADING });
  const stopLoading = () => dispatch({ type: STOP_LOADING });
  const setError = (message) => dispatch({ type: SET_ERROR, payload: message });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const clearSubmitSuccess = () => dispatch({ type: CLEAR_SUBMIT_SUCCESS });

  return (
    <LostContext.Provider
      value={{
        getAllLost,
        addLost,
        lost,
        error,
        loading,
        submitSuccess,
      }}
    >
      {children}
    </LostContext.Provider>
  );
};
