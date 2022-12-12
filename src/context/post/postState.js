import React, { useCallback, useReducer } from "react";
import {
  addComment_fb,
  addLike_fb,
  addPost_fb,
  deleteLike_fb,
  getAllPosts_fb,
} from "../../service/postService";
import {
  ADD_POST,
  GET_ALL_POSTS,
  ADD_LIKE,
  DELETE_LIKE,
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  STOP_LOADING,
  ADD_COMMENT,
  CLEAR_SUBMIT_SUCCESS,
} from "../types";
import { PostContext } from "./postContext";
import { postReducer } from "./postReducer";

export const PostState = ({ children }) => {
  const initialState = {
    posts: [],
    submitSuccess: false,
    error: null,
    loading: false,
  };
  const [state, dispatch] = useReducer(postReducer, initialState);
  const { posts, submitSuccess, error, loading } = state;

  //console.log("postState", posts);

  const addPost = async (post) => {
    clearSubmitSuccess();
    setLoading();
    clearError();
    try {
      await addPost_fb(post);
      setAddPost(post);
      stopLoading();
      setTimeout(() => clearSubmitSuccess(), 3000);
    } catch (error) {
      setError(error);
    }
  };

  const getAllPosts = useCallback(async () => {
    setLoading();
    clearError();
    try {
      const response = await getAllPosts_fb();
      setGetAllPosts(response);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  }, []);

  const addLike = async (postId, uid) => {
    try {
      setAddLike(postId, uid);
      await addLike_fb(postId, uid);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteLike = async (postId, uid) => {
    try {
      setDeleteLike(postId, uid);
      await deleteLike_fb(postId, uid);
    } catch (error) {
      console.log(error);
    }
  };

  const addComment = async (data) => {
    clearError();
    setLoading();
    try {
      await addComment_fb(data);
      setAddComment(data);
    } catch (error) {
      setError(error);
    } finally {
      stopLoading();
    }
  };

  // Actions:
  const setAddPost = (data) => dispatch({ type: ADD_POST, payload: data });
  const setGetAllPosts = (data) =>
    dispatch({ type: GET_ALL_POSTS, payload: data });

  const setAddLike = (postId, uid) =>
    dispatch({ type: ADD_LIKE, payload: { postId, uid } });
  const setDeleteLike = (postId, uid) =>
    dispatch({ type: DELETE_LIKE, payload: { postId, uid } });

  const setAddComment = (comment) =>
    dispatch({ type: ADD_COMMENT, payload: comment });

  const setError = (message) => dispatch({ type: SET_ERROR, payload: message });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const clearSubmitSuccess = () => dispatch({ type: CLEAR_SUBMIT_SUCCESS });
  const setLoading = () => dispatch({ type: SET_LOADING });
  const stopLoading = () => dispatch({ type: STOP_LOADING });

  return (
    <PostContext.Provider
      value={{
        addPost,
        getAllPosts,
        addLike,
        deleteLike,
        addComment,
        posts,
        submitSuccess,
        error,
        loading,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
