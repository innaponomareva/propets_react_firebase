import {  SET_ERROR, 
          CLEAR_ERROR, 
          SET_LOADING, 
          STOP_LOADING,
          ADD_POST, 
          GET_ALL_POSTS,
          ADD_LIKE, 
          DELETE_LIKE,
          ADD_COMMENT,
        } from "../types";

const handlers = {
  [ADD_POST]: (state, {payload}) => {
    const temp = [...state.posts];
    temp.unshift(payload);
    return {...state, posts: temp }
  },
  [GET_ALL_POSTS]: (state, {payload}) => ({...state, posts: payload}),

  [ADD_LIKE]:(state, {payload}) => {
    const posts = [...state.posts];
    const post = posts.find(item => item.postId === payload.postId);
    const index = posts.findIndex(item => item.postId === payload.postId);
    const likers = [...post.likes.whoLiked];
    likers.push(payload.uid);
    const count = post.likes.count;
    posts[index] = {...post, likes: {count: count + 1, whoLiked: likers}};
    return {...state, posts: posts}
  },
  [DELETE_LIKE]:(state, {payload}) => {
    const posts = [...state.posts];
    const post = posts.find(item => item.postId === payload.postId);
    const index = posts.findIndex(item => item.postId === payload.postId);
    const likers = [...post.likes.whoLiked];
    const userIndex = likers.findIndex(item => item === payload.uid);
    likers.splice(userIndex, 1);
    const count = post.likes.count;
    posts[index] = {...post, likes: {count: count - 1, whoLiked: likers}};
    return {...state, posts: posts}
  },
  [ADD_COMMENT]: (state, {payload}) => {
    const posts = [...state.posts];
    const post = posts.find(item => item.postId === payload.postId);
    const index = posts.findIndex(item => item.postId === payload.postId);
    const comments = [...post.comments];
    comments.push(payload);
    posts[index] = {...post, comments: comments};
    return {...state, posts: posts}
  },
  [SET_ERROR]: (state, {payload}) => ({...state, error: payload}),
  [CLEAR_ERROR]: state => ({...state, error: null}),
  [SET_LOADING]: state => ({...state, loading: true}),
  [STOP_LOADING]: state => ({...state, loading: false}),
  DEFAULT: (state) => state
}

export const postReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
}