import React, { useContext, useEffect } from 'react';
import { PostContext } from '../../context/post/postContext';
import Loader from '../loader/Loader';
import PostSmall from './PostSmall';


const Posts = () => {
  const { posts, getAllPosts, loading } = useContext(PostContext);

  useEffect(() => {
      if(posts.length === 0){
        getAllPosts();
      }
  }, [getAllPosts, posts.length]);
  

  return(
    <>
    { loading && <Loader /> }
    { !loading && posts.length > 0 ?
    <>
      {posts.map((item, index) => <div key={index}><PostSmall post={item} /></div>)}
    </>
    :
    <div>No posts</div>
    }
     
    </>
  )
}

export default Posts;