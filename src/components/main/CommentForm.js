import React, { useContext, useEffect } from 'react';
import styles from './../../modules.css/posts.module.css';
import Form from 'react-bootstrap/Form';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import { UserContext } from '../../context/user/userContext';
import { PostContext } from '../../context/post/postContext';


const schema = yup.object().shape({
  text: yup.string()
  .max(1500, 'Your comment is over 1500 characters')
  .required('Please provide some text')
});


const CommentForm = ({ postId }) => {
  const { user, getUser } = useContext(UserContext);
  const { addComment } = useContext(PostContext);
  const uid = localStorage.getItem('LOCAL_ID');
  

  useEffect(() => {
    if(user.nick === undefined){
      getUser(uid);
    }
  }, [user, getUser, uid]);


  return(
    <>
    { user.nick !== undefined && 

     <Formik initialValues={{
      postId: postId,
      commentId: `c-${moment().format()}`,
      uid: uid,
      petName: user.nick,
      date: {day: moment().format('LL'), time: moment().format('LT')},
      text: ''
    }}
    onSubmit={async (values,actions)=>{
      actions.setSubmitting(true);
      try{
        await addComment(values);
      }catch(error){
        console.log(error)
      }finally{
        actions.setSubmitting(false);
        document.querySelector('textarea').value = '';
      }
    }}
    validationSchema = {schema}
    >
      {props =>{
        return(
        <Form className="p-0" onSubmit={props.handleSubmit}>
          {props.touched.text && props.errors.text && <div>{props.errors.text}</div>}
          <Form.Control
            as="textarea"
            name="text"
            className={styles.comment_textarea}
            type="text"
            placeholder="Type your comment"
            value={props.values.comment}
            onChange={props.handleChange}
          />
          
          <button 
            className={`${styles.link_btn} ${styles.add_comment_btn}`}
            type="submit" 
            //disabled={!props.isValid || props.isSubmitting}
            >
        add comment
      </button>
  </Form>

        )
      }}
    </Formik>
    }
    </>
  )
}

export default CommentForm;