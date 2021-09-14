import React from 'react';
import styles from './../../modules.css/posts.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import Likes from './Likes';

const PostSmall = ({post}) => {

  return(
    <>
      <Row className="m-0 p-0 align-items-center">
        <Col className={styles.post_author_img} xs="auto"><img src={post.petAvatar} alt="author_img" /></Col>
        <Col>
          <div className={styles.post_author_name}>{post.petName}</div>
          <div className={styles.post_date}>{post.date.day} | {post.date.time}</div>
        </Col>
      </Row>

      <Col className={styles.small_post_img}><img src={post.postImg} alt="post_img" /></Col>
      <Col className={styles.post_title}>{post.title}</Col>
      <NavLink to={`/home/posts/${post.postId}`} className={styles.link_btn}>...more</NavLink>
      <Col className={`${styles.post_likes} ${styles.likes_box_small}`}>

        <Likes postId={post.postId} likesCount={post.likes.count} whoLikedArray={post.likes.whoLiked} />

      </Col>
      <div className={styles.post_divider}></div>
    </>
  )
}

export default PostSmall;