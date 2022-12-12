import React from "react";
import styles from "./../../css/comments.module.css";

const Comment = ({ comment }) => {
  return (
    <div>
      <div className={styles.comment_details}>
        {comment.authorName}
        <span>|</span>
        {comment.date.day}
        <span>|</span>
        {comment.date.time}
      </div>
      <div className={styles.comment_text}>{comment.text}</div>
      <div className={styles.comment_divider}></div>
    </div>
  );
};

export default Comment;
