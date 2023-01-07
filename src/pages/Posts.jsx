import React, { useContext, useEffect } from "react";
import InvitationToRegister from "../components/InvitationToRegister";
import Loader from "../components/loader/Loader";
import PostSmall from "../components/PostSmall";
import SectionTitle from "../components/SectionTitle";
import { PostContext } from "../context/post/postContext";
import { UserContext } from "../context/user/userContext";
import MainLayout from "../layouts/MainLayout";
import styles from "./../css/posts.module.css";

const Posts = () => {
  const { user } = useContext(UserContext);
  const { posts, getAllPosts, loading } = useContext(PostContext);

  useEffect(() => {
    getAllPosts();
  }, [getAllPosts]);

  return (
    <MainLayout>
      <SectionTitle title={"Posts"}>
        {!user && (
          <InvitationToRegister title="Would you like to publish a post, like and comment?" />
        )}
      </SectionTitle>
      {loading && <Loader />}
      {!loading && posts.length > 0 && (
        <>
          <div className={styles.posts_gallery}>
            {posts.map((item, index) => (
              <div key={index}>
                <PostSmall post={item} user={user} />
              </div>
            ))}
          </div>
        </>
      )}
      {!loading && posts.length === 0 && <div>No posts...</div>}
    </MainLayout>
  );
};

export default Posts;
