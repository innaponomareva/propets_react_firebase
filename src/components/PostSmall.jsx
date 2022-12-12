import React from "react";
import styles from "./../css/postSmall.module.css";
import { NavLink } from "react-router-dom";
import Likes from "./Likes";
import AvatarCard from "./AvatarCard";

const PostSmall = ({ post, user }) => {
  const getIndex40 = (title) => {
    for (let i = 0; i < title.length; i++) {
      if (i === 40) {
        return i;
      }
    }
  };
  const formatTitle = (string) => {
    const index40 = getIndex40(string);
    if (index40) {
      const partOne = string.substring(0, index40);
      return partOne + "...";
    }
    return string;
  };

  return (
    <div className={styles.post_small_container}>
      <AvatarCard
        photo={post.authorPhoto}
        name={post.authorName}
        date={post.date}
      />
      <NavLink
        to={`/posts/${post.postId}`}
        className={styles.post_small_link_box}
      >
        <div className={styles.post_small_img_box}>
          <div
            className={styles.post_small_img}
            style={{
              backgroundImage: `url(${post.postImg})`,
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "center",
            }}
          ></div>
        </div>

        <div className={styles.post_small_title}>{formatTitle(post.title)}</div>
      </NavLink>

      <div className={styles.post_small_like_box}>
        <Likes postId={post.postId} likes={post.likes} user={user} />
      </div>
    </div>
  );
};

export default PostSmall;
