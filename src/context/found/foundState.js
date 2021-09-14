import React, { useCallback, useReducer } from 'react';
import { addFound_fb, getAllFound_fb } from '../../service/foundService';
import { CLEAR_ERROR,
         SET_ERROR, 
         SET_LOADING, 
         STOP_LOADING,
         ADD_FOUND, 
         GET_ALL_FOUND
        } from '../types';
import { FoundContext } from './foundContext';
import { foundReducer } from './foundReducer';



export const FoundState = ({children}) => {
  const initialState = {
    found: [],
    error: null,
    loading: false
  }
  const [state, dispatch] = useReducer( foundReducer, initialState);
  const { found, error, loading } = state;

  //console.log('foundState', found)
  

  const getAllFound = useCallback(async()=>{
    clearError();
    setLoading();
    try{
      const response = await getAllFound_fb();
      setGetAllFound(response);
    }catch(error){
      console.log(error)
      setError(error);
    }finally{
      stopLoading();
    }
  },[])

  const addFound = async(post) => {
    clearError();
    setLoading();
    try{
      await addFound_fb(post);
      setAddFound(post);
    }catch(error){
      setError(error);
    }finally{
      stopLoading();
    }
  }



  // Actions:
  const setGetAllFound = data => dispatch({type: GET_ALL_FOUND, payload: data});
  const setAddFound = post => dispatch({type: ADD_FOUND, payload: post});

  const setLoading = () => dispatch({type: SET_LOADING});
  const stopLoading = () => dispatch({type: STOP_LOADING});
  const setError = message => dispatch({type: SET_ERROR, payload: message});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  

  return(
    <FoundContext.Provider value={{
      getAllFound,
      addFound,
      found,
      error,
      loading
    }}>
      {children}
    </FoundContext.Provider>
  )
}