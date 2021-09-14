import React, {useContext, useEffect} from 'react';
import styles from './../../modules.css/posts.module.css';
import {useParams} from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import CommentsSection from './CommentsSection';
import { PostContext } from '../../context/post/postContext';
import Likes from './Likes';
import Loader from '../loader/Loader';



const PostLarge = () => {
  const { posts, getAllPosts, loading } = useContext(PostContext);
  const { id } = useParams();
  const index = posts.findIndex(item => item.postId === id);
  const post = posts[index];

  console.log('PostLarge', posts)

  useEffect(()=>{
    if(posts.length === 0){
      getAllPosts();
    }
  },[posts, getAllPosts])

  
  return(
    <>
    {!loading && posts.length > 0 ? 
    <>
      <Row className="m-0 p-0 align-items-center">
        <Col className={styles.post_author_img} xs="auto"><img src={post.petAvatar} alt="author_img" /></Col>
        <Col>
          <div className={styles.post_author_name}>{post.petName}</div>
          <div className={styles.post_date}>{post.date.day} | {post.date.time}</div>
        </Col>
      </Row>
      <Col className={styles.big_post_img}><img src={post.postImg} alt="post_img" /></Col>
      <Col className={styles.post_title}>{post.title}</Col>
      <p className={styles.post_text}>{post.text}</p>

      <Col className={styles.post_likes}>
        <Likes postId={id} likesCount={post.likes.count} whoLikedArray={post.likes.whoLiked} />
      </Col>
      
      <CommentsSection postId={id} comments={post.comments} />
    </>
    : 
    <Loader />
    }
    </>
  )
}

export default PostLarge;