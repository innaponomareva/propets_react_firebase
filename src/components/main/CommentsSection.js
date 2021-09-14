import React, { useContext } from 'react';
import styles from './../../modules.css/posts.module.css';
import Col from 'react-bootstrap/Col';
import Comment from './Comment';
import CommentForm from './CommentForm';
import Loader from '../loader/Loader';
import { PostContext } from '../../context/post/postContext';


const CommentsSection = ({ postId, comments }) => {
  const { loading } = useContext(PostContext);


  return(
    <Col className={styles.comment_section}>
        <h5 className={styles.comment_section_title}>Comments</h5>
        <div className={styles.comment_divider}></div>
        
        {loading && <Loader />}
        
        {comments.length > 0 &&
        <>
          {comments.map((item, index) => <Comment key={index} comment={item} />)}
        </>
        }
        
      <CommentForm postId={postId} />
    </Col>
  )
}

export default CommentsSection;