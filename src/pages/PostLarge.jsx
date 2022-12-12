import React, { useContext, useEffect } from "react";
import styles from "../css/postLarge.module.css";
import { useParams } from "react-router-dom";
import { PostContext } from "../context/post/postContext";
import Likes from "../components/Likes";
import CommentsSection from "../components/comments/CommentsSection";
import Loader from "../components/loader/Loader";
import MainLayout from "../layouts/MainLayout";
import AvatarCard from "../components/AvatarCard";
import InvitationToRegister from "../components/InvitationToRegister";

const PostLarge = ({ user }) => {
  const { posts, getAllPosts, loading } = useContext(PostContext);
  const { id } = useParams();
  const post = posts.find((item) => item.postId === id);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <MainLayout>
      {loading && <Loader />}
      {!loading && !user && (
        <div style={{ marginBottom: "4rem" }}>
          <InvitationToRegister title="Would you like to publish a post, like and comment?" />
        </div>
      )}
      {!loading && post && (
        <div className={styles.post_large_container}>
          <AvatarCard
            photo={post.authorPhoto}
            name={post.authorName}
            date={post.date}
          />
          <div className={styles.post_large_photo}>
            <img src={post.postImg} alt="post_img" />
          </div>
          <div className={styles.post_large_text_box}>
            <div className={styles.post_large_title}>{post.title}</div>
            <p className={styles.post_large_text}>{post.text}</p>
          </div>

          <div className={styles.post_likes_box}>
            <Likes postId={id} likes={post.likes} user={user} />
          </div>
          <div className={styles.comments_section}>
            <CommentsSection postId={id} comments={post.comments} user={user} />
          </div>
        </div>
      )}
      {!loading && !post && <div>Post not found...</div>}
    </MainLayout>
  );
};

export default PostLarge;
