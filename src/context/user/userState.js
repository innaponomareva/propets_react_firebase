import React, { useReducer } from 'react';
import { addUser_fb, getAllUsers_fb, getUser_fb, updateUser_fb } from '../../service/userService';
import { CLEAR_ERROR, GET_USER, SET_ERROR, SET_LOADING, UPDATE_USER, STOP_LOADING, GET_ALL_USERS, ADD_USER } from '../types';
import { UserContext } from './userContext';
import { userReducer } from './userReducer';

export const UserState = ({children}) => {
  const initialState = {
    user: {},
    users: [],
    error: null,
    loading: false
  }
  const [state, dispatch] = useReducer(userReducer, initialState);
  const {user, users, error, loading} = state;

  //console.log('userState', user)


  async function updateUser(uid, update){
    setLoading();
    clearError();
    try{
      await updateUser_fb(uid, update)
      setUpdateUser(uid, update);
    }catch(error){
      setError(error)
    }finally{
      stopLoading();
    }
  }

  async function getUser(uid){
    setLoading();
    clearError();
    try{
      await getAllUsers();
      const response = await getUser_fb(uid)
      setGetUser(uid);
      return response;
    }catch(error){
      setError(error);
    }finally{
      stopLoading();
    }
  }

  async function addUser({uid, name, email}){
    setLoading();
    clearError();
    try{
      await addUser_fb({uid, name, email})
      setAddUser({uid, name, email});
    }catch(error){
      setError(error);
    }finally{
      stopLoading();
    }
  }

  async function getAllUsers(){
    clearError();
    setLoading();
    try{
      const response = await getAllUsers_fb();
      setGetAllUsers(response);
    }catch(error){
      setError(error);
    }finally{
      stopLoading();
    }
  }


  // Actions:
  const setAddUser = data => dispatch({type: ADD_USER, payload: data});
  const setGetUser = uid => dispatch({type: GET_USER, payload: uid});
  const setUpdateUser = update => dispatch({type: UPDATE_USER, payload: update});
  const setGetAllUsers = data => dispatch({type: GET_ALL_USERS, payload: data});

  const setLoading = () => dispatch({type: SET_LOADING});
  const stopLoading = () => dispatch({type: STOP_LOADING});
  const setError = message => dispatch({type: SET_ERROR, payload: message});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  

  return(
    <UserContext.Provider value={{
      updateUser,
      addUser,
      getUser,
      getAllUsers,
      user,
      users,
      error,
      loading
    }}>
      {children}
    </UserContext.Provider>
  )
}