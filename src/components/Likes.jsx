import React, { useContext, useEffect, useState } from "react";
import styles from "./../css/likes.module.css";
import { AiOutlineHeart, AiTwotoneHeart } from "react-icons/ai";
import { withRouter } from "react-router";
import { PostContext } from "../context/post/postContext";

const Likes = ({ postId, user, likes }) => {
  const { addLike, deleteLike } = useContext(PostContext);
  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(likes.length > 0 ? likes.length : 0);

  useEffect(() => {
    if (user) {
      likes.forEach((item) => {
        if (item === user.uid) {
          setIsLiked(true);
        }
      });
    }
  }, [user, setIsLiked, likes]);

  return (
    <div className={styles.likes_box}>
      <div className={styles.likes_count}>{count}</div>

      {user && isLiked ? (
        <AiTwotoneHeart
          className={styles.like_btn}
          onClick={() => {
            setIsLiked(!isLiked);
            setCount(count - 1);
            deleteLike(postId, user.uid);
          }}
        />
      ) : (
        <AiOutlineHeart
          className={user ? styles.like_btn : styles.like_disabled}
          onClick={
            user
              ? () => {
                  setIsLiked(!isLiked);
                  setCount(count + 1);
                  addLike(postId, user.uid);
                }
              : null
          }
        />
      )}
    </div>
  );
};

export default withRouter(Likes);
