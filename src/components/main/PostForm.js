import React, { useContext, useEffect } from 'react';
import styles from '../../modules.css/posts.module.css';
import { useHistory } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import firebase from 'firebase';
import {Formik} from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaw,} from '@fortawesome/free-solid-svg-icons';
import { PostContext } from '../../context/post/postContext';
import { UserContext } from '../../context/user/userContext';


const schema = yup.object().shape({
  title: yup.string()
  .max(100, 'Your title is too long!')
  .required('Please give a title to your post!'),
  text: yup.string()
  .max(1500, 'Your text is over 1500 characters!')
  .required('Please provide some text!'),
  postImg: yup.string()
  .url('Please provide a valid url!')
  .required('Please add a photo to your post!')
});



const PostForm = () => {
  const { user } = useContext(UserContext);
  const { posts, addPost, getAllPosts } = useContext(PostContext);
  const uid = localStorage.getItem('LOCAL_ID');
  const history = useHistory();

  useEffect(() => {
    if(posts.length === 0){
      getAllPosts()
    }
  }, [getAllPosts, posts]);


  return(
    <>
    <Formik initialValues={{
      title: '',
      text: '',
      postImg: '',
    }}
    onSubmit={ async(values,actions)=>{
      actions.setSubmitting(true);
      try{
        await addPost({
          ...values,
          uid: uid,
          postId: 'post_' + firebase.firestore.Timestamp.now().seconds,
          created: firebase.firestore.Timestamp.now().seconds,
          date: {day: moment().format('LL'), time: moment().format('LT')},
          likes: {count: 0, whoLiked: []},
          comments: [],
          petAvatar: user.photo,
          petName: user.nick
        });
        history.push('/home');
      }catch(error){
        console.log(error)
      }finally{
        actions.setSubmitting(false);
      }
    }}
    validationSchema = {schema}
    >
      { props => {
        //console.log('props', props)
        return(
          <Col className={styles.post_form}>
            <h5 className={styles.post_form_title}>Your new post! Simply text, add photo and publish.</h5>
            <div className={styles.post_form_divider}></div>
            
            <Form className="p-0" onSubmit={props.handleSubmit}> 
              <Form.Label className={styles.label}>Title:</Form.Label>
              {props.touched.title && props.errors.title && <div>{props.errors.title}</div>}
              <Form.Control
                      className={styles.post_form_input}
                      name="title"
                      type="text"
                      placeholder="Post title"
                      value={props.values.title}
                      onChange={props.handleChange}
                      />

                <Form.Label className={styles.label}>Text:<p className={styles.help_text}>up to 1500 char</p></Form.Label>
                {props.touched.text && props.errors.text && <div>{props.errors.text}</div>}
                <Form.Control
                      as="textarea"
                      name="text"
                      className={styles.post_form_textarea}
                      type="text"
                      placeholder="Type your text"
                      value={props.values.text}
                      onChange={props.handleChange}
                      />
                
                <Form.Label className={styles.label}>Photo:</Form.Label>
                {props.touched.postImg && props.errors.postImg && <div>{props.errors.postImg}</div>}
                <Form.Control
                      className={styles.post_form_input}
                      name="postImg"
                      type="text"
                      placeholder="Photo url"
                      value={props.values.postImg}
                      onChange={props.handleChange}
                      />


                <Row className={styles.post_form_bottom_section} xs="12">
                  <Col className="m-0 p-0">
                    <Row className="m-0 p-0 align-items-center">
                        <Col xs="auto" className={styles.post_author_img}><img src={user.photo} alt="author_photo" /></Col>
                        <Col className={`${styles.post_author_name} pl-3`}>{user.nick}</Col>
                    </Row>
                  </Col>
                    
                  <Col className="p-0 text-align-right">
                    <button 
                      type="submit" 
                      className={styles.publish_post_btn} 
                      disabled={props.isSubmitting}
                      >
                      <span><FontAwesomeIcon icon={faPaw}/></span>
                      Publish
                    </button>

                  </Col>
                </Row>
            </Form>
          </Col>
        )
      }}
    </Formik>
      
    </>
  )
}

export default PostForm;
