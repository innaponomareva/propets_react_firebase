import React, { useCallback, useEffect, useReducer } from "react";
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
  CLEAR_AUTH_SUCCESS,
  GET_CURRENT_UID,
} from "../types";
import { UserContext } from "./userContext";
import { userReducer } from "./userReducer";
import { auth } from "../../config/firebase_config";
import { onAuthStateChanged } from "firebase/auth";

export const UserState = ({ children }) => {
  const initialState = {
    users: [],
    currentUid: null,
    authSuccess: false,
    updateSuccess: false,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(userReducer, initialState);
  const { users, currentUid, authSuccess, updateSuccess, error, loading } =
    state;

  const user = users.find((item) => item.uid === currentUid);

  const login = async ({ email, password }) => {
    setLoading();
    clearError();
    try {
      await login_fb(email, password);
      setLogin();
      setTimeout(() => clearAuthSuccess(), 1000);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  };

  const register = async ({ name, email, password }) => {
    setLoading();
    clearError();
    try {
      const response = await register_fb(email, password);
      await addUser({ uid: response.user.uid, name, email });
      setLogin();
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  };

  async function logout() {
    setLoading();
    clearError();
    try {
      await logout_fb();
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

  const getCurrentUid = useCallback(async () => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const currUid = user.uid;
          setCurrentUid(currUid);
          console.log("user signed in");
        } else {
          setCurrentUid(null);
          console.log("user signed out");
        }
      });
    } catch (error) {
      setError(error);
    }
  }, []);

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

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  useEffect(() => {
    getCurrentUid();
  }, [getCurrentUid]);

  // Actions:
  const setLogin = () => dispatch({ type: LOGIN });
  const setLogout = () => dispatch({ type: LOGOUT });
  const setCurrentUid = (uid) =>
    dispatch({ type: GET_CURRENT_UID, payload: { uid } });
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
  const clearAuthSuccess = () => dispatch({ type: CLEAR_AUTH_SUCCESS });

  return (
    <UserContext.Provider
      value={{
        updateUser,
        addUser,
        getAllUsers,
        login,
        register,
        logout,
        getCurrentUid,
        clearError,
        user,
        users,
        currentUid,
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
