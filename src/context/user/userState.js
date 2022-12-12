import React, { useCallback, useReducer } from "react";
import { login_fb, logout_fb, register_fb } from "../../service/userService";
import {
  addUser_fb,
  getAllUsers_fb,
  updateUser_fb,
} from "../../service/userService";
import {
  CLEAR_ERROR,
  SET_ERROR,
  SET_LOADING,
  UPDATE_USER,
  STOP_LOADING,
  GET_ALL_USERS,
  ADD_USER,
  LOGIN,
  LOGOUT,
  CLEAR_UPDATE_SUCCESS,
} from "../types";
import { UserContext } from "./userContext";
import { userReducer } from "./userReducer";

export const UserState = ({ children }) => {
  const initialState = {
    users: [],
    authSuccess: false,
    updateSuccess: false,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { users, authSuccess, updateSuccess, error, loading } = state;

  async function login({ email, password }) {
    setLoading();
    clearError();
    try {
      const response = await login_fb(email, password);
      localStorage.setItem("LOCAL_ID", response.user.uid);
      setLogin();
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  async function register({ name, email, password }) {
    setLoading();
    clearError();
    try {
      const response = await register_fb(email, password);
      await addUser({ uid: response.user.uid, name, email });
      localStorage.setItem("LOCAL_ID", response.user.uid);
      setLogin();
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  async function logout() {
    setLoading();
    clearError();
    try {
      await logout_fb();
      localStorage.removeItem("LOCAL_ID");
      setLogout();
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  async function updateUser(update) {
    setLoading();
    clearError();
    try {
      await updateUser_fb(update);
      setUpdateUser(update);
      setTimeout(() => clearUpdateSuccess(), 3000);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  async function addUser({ uid, name, email }) {
    setLoading();
    clearError();
    try {
      await addUser_fb({ uid, name, email });
      setAddUser({ uid, name, email });
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }

  const getAllUsers = useCallback(async () => {
    clearError();
    setLoading();
    try {
      const response = await getAllUsers_fb();
      setGetAllUsers(response);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }, []);

  // Actions:
  const setLogin = () => dispatch({ type: LOGIN });
  const setLogout = () => dispatch({ type: LOGOUT });
  const setAddUser = ({ uid, name, email }) =>
    dispatch({ type: ADD_USER, payload: { uid, name, email } });
  const setUpdateUser = (update) =>
    dispatch({ type: UPDATE_USER, payload: update });
  const setGetAllUsers = (data) =>
    dispatch({ type: GET_ALL_USERS, payload: data });

  const setLoading = () => dispatch({ type: SET_LOADING });
  const stopLoading = () => dispatch({ type: STOP_LOADING });
  const setError = (message) => dispatch({ type: SET_ERROR, payload: message });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const clearUpdateSuccess = () => dispatch({ type: CLEAR_UPDATE_SUCCESS });

  return (
    <UserContext.Provider
      value={{
        updateUser,
        addUser,
        getAllUsers,
        login,
        register,
        logout,
        clearError,
        users,
        authSuccess,
        updateSuccess,
        error,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
