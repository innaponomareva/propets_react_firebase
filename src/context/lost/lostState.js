import React, { useCallback, useReducer } from 'react';
import { addLost_fb, getAllLost_fb } from '../../service/lostService';
import { CLEAR_ERROR,
         SET_ERROR, 
         SET_LOADING, 
         STOP_LOADING,
         GET_ALL_LOST,
         ADD_LOST,
        } from '../types';
import { LostContext } from './lostContext';
import { lostReducer } from './lostReducer';



export const LostState = ({children}) => {
  const initialState = {
    lost: [],
    error: null,
    loading: false
  }
  const [state, dispatch] = useReducer( lostReducer, initialState);
  const {lost, error, loading} = state;

  //console.log('lostState', lost)
  

  const getAllLost = useCallback(async()=>{
    clearError();
    setLoading();
    try{
      const response = await getAllLost_fb();
      setGetAllLost(response);
      console.log(response)
    }catch(error){
      console.log(error)
      setError(error);
    }finally{
      stopLoading();
    }
  },[])

  const addLost = async(post) => {
    clearError();
    setLoading();
    try{
      //console.log(post);
      await addLost_fb(post);
      setAddLost(post);
    }catch(error){
      setError(error);
    }finally{
      stopLoading();
    }
  }



  // Actions:
  const setGetAllLost = data => dispatch({type: GET_ALL_LOST, payload: data});
  const setAddLost = post => dispatch({type: ADD_LOST, payload: post});

  const setLoading = () => dispatch({type: SET_LOADING});
  const stopLoading = () => dispatch({type: STOP_LOADING});
  const setError = message => dispatch({type: SET_ERROR, payload: message});
  const clearError = () => dispatch({type: CLEAR_ERROR});

  

  return(
    <LostContext.Provider value={{
      getAllLost,
      addLost,
      lost,
      error,
      loading
    }}>
      {children}
    </LostContext.Provider>
  )
}