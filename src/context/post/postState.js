import React, { useCallback, useReducer } from 'react';
import { addComment_fb, addLike_fb, addPost_fb, deleteLike_fb, getAllPosts_fb } from '../../service/postService';
import { ADD_POST, GET_ALL_POSTS, 
         ADD_LIKE, DELETE_LIKE,
         SET_ERROR, CLEAR_ERROR, 
         SET_LOADING, STOP_LOADING, 
         ADD_COMMENT
         } from '../types';
import { PostContext } from './postContext';
import { postReducer } from './postReducer';


export const PostState = ({children}) => {
  const initialState = { 
    posts: [],
    comments:[],
    error: null,
    loading: false
  }
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { posts, error, loading } = state;

  //console.log('postState', posts);
  

  const addPost = async(post) => {
    setLoading();
    clearError();
    try{
      await addPost_fb(post);
      setAddPost(post);
      stopLoading();
    }catch(error){
      setError(error);
      console.log(error);
    }
  }


 const getAllPosts = useCallback(async()=>{
    setLoading();
    clearError();
    try{
      const response = await getAllPosts_fb();
      setGetAllPosts(response);
    }catch(error){
      setError(error);
    }finally{
      stopLoading();
    }
  },[])
  
  

  const addLike = async(postId, count, uid) => {
    try{
      setAddLike(postId, count, uid);
      //console.log('likesState --> addlike', postId, count, uid)
      await addLike_fb(postId, count, uid);
    }catch(error){
      console.log(error)
    }
  }

  const deleteLike = async(postId, count, uid) => {
    try{
      setDeleteLike(postId, count, uid);
      //console.log('likesState --> deletelike', postId, count, uid)
      await deleteLike_fb(postId, count, uid);
    }catch(error){
      console.log(error)
    }
  }

  const addComment = async({postId, commentId, uid, petName, date, text}) => {
    clearError();
    setLoading();
    try{
      await addComment_fb({postId, commentId, uid, petName, date, text});
      setAddComment({postId, commentId, uid, petName, date, text});
    }catch(error){
      setError(error);
      console.log(error)
    }finally{
      stopLoading();
    }
  }



  // Actions:
  const setAddPost = data => dispatch({type: ADD_POST, payload: data});
  const setGetAllPosts = data => dispatch({type: GET_ALL_POSTS, payload: data});

  const setAddLike = (postId, count, uid) => dispatch({type: ADD_LIKE, payload: {postId, count, uid}});
  const setDeleteLike = (postId, count, uid) => dispatch({type: DELETE_LIKE, payload: {postId, count, uid}});

  const setAddComment = comment => dispatch({type: ADD_COMMENT, payload: comment});

  const setError = message => dispatch({type: SET_ERROR, payload: message});
  const clearError = () => dispatch({type: CLEAR_ERROR});
  const setLoading = () => dispatch({type: SET_LOADING});
  const stopLoading = () => dispatch({type: STOP_LOADING});

  return(
    <PostContext.Provider value={{
      addPost,
      getAllPosts,
      addLike,
      deleteLike,
      addComment,
      posts,
      error,
      loading
    }}>
      {children}
    </PostContext.Provider>
  )
}