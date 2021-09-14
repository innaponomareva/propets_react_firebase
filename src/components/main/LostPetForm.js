import React, { useContext, useEffect, useState } from 'react';
import '../../modules.css/petForm.css';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import {Formik} from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Picture from './../../images/add_form_icon.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaw,} from '@fortawesome/free-solid-svg-icons';
import { onFileChange_fb } from '../../service/appService';
import { LostContext } from '../../context/lost/lostContext';
import Dropdown from '../dropdown/Dropdown';


const schema = yup.object().shape({
  nickname: yup.string()
  .required('Please indicate the name of your buddy!'),
  breed: yup.string()
  .required('Please indicate the breed of your buddy!'),
  color: yup.string()
  .required('Please indicate the color of your buddy!'),
  features: yup.string()
  .max(60, 'Your text is over 60 characters!')
  .required('Please type some distinctive features!'),
  description: yup.string()
  .max(100, 'Your text is over 100 characters!')
  .required('Please give a little more information!'),
  location: yup.string()
  .required('Please type the location, where you lost your buddy!'),
  phone: yup.string()
  .required('Please leave your phone number!'),
  email:yup.string()
  .required('Please leave your email!')
})




const LostPetForm = () => {
  const uid = localStorage.getItem('LOCAL_ID');
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  const [fileUrl, setFileUrl] = useState(null);
  const { addLost } = useContext(LostContext);


  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);


  const onFileChange = async (event) => {
    try{
      const response = await onFileChange_fb(event);
      setFileUrl(response);
    }catch(error){
      console.log(error)
    }  
  }

  return(
    <>
    <div className="pet_form_title"><b>Lost your buddy?</b> Keep calm and complete the form.</div>
    <div className="pet_form_divider"></div>
    
    <Formik initialValues={{
      nickname: '',
      breed: '',
      color: '',
      features: '',
      description: '',
      location: '',
      phone: '',
      email: ''
    }}

    
    onSubmit={async(values,actions)=>{
      actions.setSubmitting(true);
      try{
        await addLost({
          ...values,
          type: document.querySelector('.dropdown_input.type').value,
          sex: document.querySelector('.dropdown_input.sex').value,
          height: document.querySelector('.dropdown_input.height').value,
          uid: uid,
          postId: 'lost_' + firebase.firestore.Timestamp.now().seconds,
          created: firebase.firestore.Timestamp.now().seconds,
          photo: fileUrl,
        });
        history.push('/home/lost');
      }catch(error){
        console.log(error)
      }finally{
        actions.setSubmitting(false);
      }
    }}
    validationSchema = {schema}
    >
      {props => {
        console.log(props.values)
        return(
          <Form className="pet_form" onSubmit={props.handleSubmit}>

            <Row className="outer_row m-0 p-0 justify-content-between">
              <Row className="inner_row flex-column mr-5 flex-grow-1">
                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Nickname:</Form.Label>
                    <Col xs="9" className="input_box">
                      {props.touched.nickname && props.errors.nickname && <div>{props.errors.nickname}</div>}
                      <Form.Control
                        type="text"
                        name="nickname"
                        placeholder="Uncle Sam"
                        value={props.values.nickname}
                        onChange={props.handleChange}
                        />
                    </Col>
                  </Form.Group>
                  
                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Type:</Form.Label>
                    <Col xs="9" style={{position:'relative', zIndex:'3'}} className="input_box">
                    <Dropdown
                        name="type"
                        value={props.values.type}
                        array={['dog','cat','bird','rabbit','other']}
                        />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Sex:</Form.Label>
                    <Col xs="9" style={{position:'relative', zIndex:'2'}} className="input_box">
                      <Dropdown
                        name="sex"
                        value={props.values.sex}
                        array={['male','female']}
                        />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Height:</Form.Label>
                    <Col xs="9" style={{position:'relative', zIndex:'1'}} className="input_box">
                      <Dropdown 
                        name="height"
                        value={props.values.height}
                        array={['5–10 cm','10–15 cm','15–20 cm','20–40 cm','40–60 cm','60–80 cm']}
                      />
                    </Col>
                  </Form.Group>
                
                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Breed:</Form.Label>
                    <Col xs="9" className="input_box">
                      {props.touched.breed && props.errors.breed && <div>{props.errors.breed}</div>}
                      <Form.Control 
                        type="text"
                        name="breed"
                        placeholder="Golden Retriever"
                        value={props.values.breed}
                        onChange={props.handleChange}
                        />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Color:</Form.Label>
                    <Col xs="9" className="input_box">
                      {props.touched.color && props.errors.color && <div>{props.errors.color}</div>}
                      <Form.Control 
                        type="text"
                        name="color"
                        placeholder="Beige"
                        value={props.values.color}
                        onChange={props.handleChange}
                        />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Location:</Form.Label>
                    <Col xs="9" className="input_box">
                      {props.touched.location && props.errors.location && <div>{props.errors.location}</div>}
                      <Form.Control
                        type="text"
                        name="location"
                        placeholder="Oliver Platz, Berlin"
                        value={props.values.location}
                        onChange={props.handleChange}
                        />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Distinktive features: <p>up to 60 char</p></Form.Label>
                    <Col xs="9" className="input_box">
                      {props.touched.features && props.errors.features && <div>{props.errors.features}</div>}
                      <Form.Control
                        as="textarea"
                        type="text"
                        name="features"
                        placeholder="blue collar with stars, no left ear, damaged tail."
                        value={props.values.features}
                        onChange={props.handleChange}
                        />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xs="3">Description: <p>up to 100 char</p></Form.Label>
                    <Col xs="9" className="input_box">
                      {props.touched.description && props.errors.description && <div>{props.errors.description}</div>}
                      <Form.Control
                        as="textarea" 
                        type="text"
                        name="description"
                        placeholder="some more information"
                        value={props.values.description}
                        onChange={props.handleChange}
                        />
                    </Col>
                  </Form.Group>
              </Row>


              <Row className="inner_row d-flex flex-column flex-nowrap justify-content-between m-0 ml-auto mr-auto p-0 pt-4 pb-4">
                <Col xs="9" className="form_picture m-0 mb-3 p-0 ml-auto mr-auto">
                  <img src={Picture} alt="add_form_icon" />
                </Col>

                <Col className="form_upload m-0 p-0">
                  <Form.Group className="m-0">
                    <Form.Label xs="3" className="p-0 m-0 mb-2">Photo:</Form.Label>
                    <Col xs="12" className="p-0">
                    <Form.File 
                      className="p-0"
                      name="photo"
                      label=""
                      custom
                      onChange={onFileChange}
                      />
                    </Col>
                  </Form.Group>
                </Col>
              </Row>
            </Row>
  

            <div className="pet_form_divider_bottom"></div>

            <Row className="flex-wrap m-0 p-0">
              <Col className="m-0 p-0">
                <Form.Group as={Row}>
                  <Form.Label column xs="3">Email:</Form.Label>
                  <Col xs="9">
                    {props.touched.email && props.errors.email && <div>{props.errors.email}</div>}
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="name@mail.com"
                      value={props.values.email}
                      onChange={props.handleChange}
                      />
                  </Col>
                </Form.Group>
              </Col>

              <Col xl="6" className="m-0 p-0">
                <Form.Group as={Row}>
                  <Form.Label column xs="3">Phone:</Form.Label>
                  <Col xs="9">
                  {props.touched.phone && props.errors.phone && <div>{props.errors.phone}</div>}
                  <Form.Control
                      type="text"
                      name="phone"
                      placeholder="00-00-000-000"
                      value={props.values.phone}
                      onChange={props.handleChange}
                      />
                  </Col>
                </Form.Group>
              </Col>
            </Row>

            <Col className="p-0 text-align-right">
              <button type="submit" 
                      className="publish_post_btn" 
                      disabled={props.isSubmitting || !fileUrl}>
                <span><FontAwesomeIcon icon={faPaw}/></span>Publish
              </button>
            </Col>
          </Form>
        )
      }}
    </Formik>
    </>
  )
}

export default LostPetForm;

