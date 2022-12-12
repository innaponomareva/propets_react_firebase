import React, { useContext } from "react";
import styles from "./../../css/comments.module.css";
import { PostContext } from "../../context/post/postContext";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import Loader from "../loader/Loader";

const CommentsSection = ({ postId, comments, user }) => {
  const { loading } = useContext(PostContext);

  return (
    <div>
      <h5 className={styles.comment_section_title}>Comments</h5>
      <div className={styles.comment_section_divider}></div>

      {loading && <Loader />}

      {!loading && comments.length > 0 && (
        <div className={styles.comments_box}>
          {comments.map((item, index) => (
            <Comment key={index} comment={item} />
          ))}
        </div>
      )}
      {user && <CommentForm postId={postId} user={user} />}
    </div>
  );
};

export default CommentsSection;
