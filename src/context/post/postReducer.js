import {
  SET_ERROR,
  CLEAR_ERROR,
  SET_LOADING,
  STOP_LOADING,
  ADD_POST,
  GET_ALL_POSTS,
  ADD_LIKE,
  DELETE_LIKE,
  ADD_COMMENT,
  CLEAR_SUBMIT_SUCCESS,
} from "../types";

const handlers = {
  [ADD_POST]: (state, { payload }) => {
    const temp = [...state.posts];
    temp.unshift(payload);
    return { ...state, posts: temp, submitSuccess: true };
  },
  [GET_ALL_POSTS]: (state, { payload }) => ({ ...state, posts: payload }),

  [ADD_LIKE]: (state, { payload }) => {
    const posts = [...state.posts];
    const index = posts.findIndex((item) => item.postId === payload.postId);
    const post = posts[index];
    const likes = [...post.likes];
    likes.push(payload.uid);
    posts[index] = { ...post, likes: likes };
    //console.log("postReducer__likes", likes);
    return { ...state, posts: posts };
  },
  [DELETE_LIKE]: (state, { payload }) => {
    const posts = [...state.posts];
    const index = posts.findIndex((item) => item.postId === payload.postId);
    const post = posts[index];
    const likes = [...post.likes];
    const newLikes = likes.filter((item) => item !== payload.uid);
    //console.log("postReducer__newLikes", newLikes);
    posts[index] = { ...post, likes: newLikes };

    return { ...state, posts: posts };
  },
  [ADD_COMMENT]: (state, { payload }) => {
    const posts = [...state.posts];
    const post = posts.find((item) => item.postId === payload.postId);
    const index = posts.findIndex((item) => item.postId === payload.postId);
    const comments = [...post.comments];
    comments.push(payload);
    posts[index] = { ...post, comments: comments };
    return { ...state, posts: posts };
  },
  [SET_ERROR]: (state, { payload }) => ({ ...state, error: payload }),
  [CLEAR_ERROR]: (state) => ({ ...state, error: null }),
  [CLEAR_SUBMIT_SUCCESS]: (state) => ({ ...state, submitSuccess: false }),
  [SET_LOADING]: (state) => ({ ...state, loading: true }),
  [STOP_LOADING]: (state) => ({ ...state, loading: false }),
  DEFAULT: (state) => state,
};

export const postReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;
  return handler(state, action);
};
