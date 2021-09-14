import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import styles from './../../modules.css/posts.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faThumbsUp as LikeRegular } from '@fortawesome/free-regular-svg-icons';
import  { faThumbsUp as LikeSolid } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router';
import { PostContext } from '../../context/post/postContext';

const Likes = ({postId, likesCount, whoLikedArray}) => {
  const uid = localStorage.getItem('LOCAL_ID');
  const {addLike, deleteLike} = useContext(PostContext)
  const [userWhoLiked, setUserWhoLiked] = useState(false);
  const [count, setCount] = useState(likesCount);

  const notLikedBtn = useRef();
  const likedBtn = useRef();


  const checkUserWhoLiked = useCallback(() => {
    whoLikedArray.forEach(item => {
      if(item === uid){
        setUserWhoLiked(true)
      }});
    },[uid, whoLikedArray])

  useEffect(()=>{
    checkUserWhoLiked();
  },[checkUserWhoLiked])

  function onLikeBtnHandler(){
    if(userWhoLiked){
      setUserWhoLiked(false)
      setCount(count - 1);
      deleteLike(postId, count, uid);
    }else if(!userWhoLiked){
      setUserWhoLiked(true)
      setCount(count + 1);
      addLike(postId, count, uid);
    }
  }

  return(
    <>
    <div className={styles.likes_count}>{count}</div>

    { userWhoLiked ? 
    <>
      <button 
        ref={likedBtn} 
        id="isLike" 
        className={styles.like_btn} 
        onClick={()=>{
          onLikeBtnHandler()
        }}
        >
        <FontAwesomeIcon className={styles.like_icon} icon={LikeSolid} />
      </button>
    </>
    :
    <>
    <button 
      ref={notLikedBtn} 
      id="noLike" 
      className={styles.like_btn} 
      onClick={()=>{
        onLikeBtnHandler()
      }}
      >
      <FontAwesomeIcon className={styles.like_icon} icon={LikeRegular} />
    </button>
    </>
    }
    </>

  )

}

export default withRouter(Likes);