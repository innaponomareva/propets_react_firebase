import React, {useReducer} from 'react';
import { login_fb, register_fb, logout_fb } from '../../service/authService';
import { CLEAR_ERROR, SET_ERROR, LOGIN, LOGOUT, SET_LOADING, STOP_LOADING} from '../types';
import { AuthContext } from './authContext';
import { authReducer } from './authReducer';

export const AuthState = ({children}) => {
  const initialState = {
    loading: false,
    authSuccess: false,
    error: null
  }
  const [state, dispatch] = useReducer(authReducer, initialState);
  

  
 async function login (email, password){
    setLoading();
    clearError();
    try{
      await login_fb(email, password)
      setLogin()
    }catch(error){
      console.log(error)
      setError(error)
    }finally{
      stopLoading();
    }
  }

  async function registration(name, email, password){
    setLoading();
    clearError();
    try{
      await register_fb(name, email, password)
      setLogin()
    }catch(error){
      console.log(error)
      setError(error)
    }finally{
      stopLoading();
    }
  }

  async function logout(){
    setLoading();
    clearError();
    try{
      await logout_fb()
      setLogout()
    }catch(error){
      console.log(error)
      setError(error)
    }finally{
      stopLoading();
    }
  }

  // Actions:
  const setLogin = () => dispatch({type: LOGIN});
  const setLogout = () => dispatch({type: LOGOUT});

  const setError = message => dispatch({type: SET_ERROR, payload: message});
  const clearError = () => dispatch({type: CLEAR_ERROR});
  const setLoading = () => dispatch({type: SET_LOADING});
  const stopLoading = () => dispatch({type: STOP_LOADING});

  const {loading, authSuccess, error} = state;


  return(
    <AuthContext.Provider value={{
      login, registration, logout,
      loading, authSuccess, error
    }}>
      {children}
    </AuthContext.Provider>
  )
}