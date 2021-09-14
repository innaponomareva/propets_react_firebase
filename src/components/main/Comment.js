import React from 'react';
import styles from './../../modules.css/posts.module.css';
import Col from 'react-bootstrap/Col';


const Comment = ({comment}) => {
  return(
    <>
        <Col className={styles.comment_item}>
          <Col className={styles.comment_info}>{comment.petName}<span>|</span>{comment.date.day}<span>|</span>{comment.date.time}</Col>
          <Col className={styles.comment_text}>
            {comment.text}
          </Col>
          <div className={styles.comment_item_divider}></div>
        </Col>
    </>
  )
}

export default Comment;
