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
import { FoundContext } from '../../context/found/foundContext';


const schema = yup.object().shape({
  type: yup.string()
  .required('Please indicate the type of the found pet!'),
  sex: yup.string()
  .required('Please indicate the sex of the found pet!'),
  breed: yup.string()
  .required('Please indicate the breed of the found pet!'),
  color: yup.string()
  .required('Please indicate the color of the found pet!'),
  height: yup.string()
  .required('Please indicate the height of the found pet!'),
  features: yup.string()
  .max(60, 'Your text is over 60 characters!')
  .required('Please type some distinctive features!'),
  description: yup.string()
  .max(100, 'Your text is over 100 characters!')
  .required('Please give a little more information!'),
  location: yup.string()
  .required('Please indicate the location, where you found the pet!'),
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
  const { addFound } = useContext(FoundContext);

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
    <div className="pet_form_title"><b>Found a pet?</b> Please complete the form to help.</div>
    <div className="pet_form_divider"></div>
    
    <Formik initialValues={{
      type: '',
      sex: '',
      breed: '',
      color: '',
      height: '',
      features: '',
      description: '',
      location: '',
      phone: '',
      email: ''
    }}
    onSubmit={async(values,actions)=>{
      actions.setSubmitting(true);
      try{
        await addFound({
          ...values,
          uid: uid,
          postId: 'found_' + firebase.firestore.Timestamp.now().seconds,
          created: firebase.firestore.Timestamp.now().seconds,
          photo: fileUrl,
        });
        history.push('/home/found');
      }catch(error){
        console.log(error)
      }finally{
        actions.setSubmitting(false);
      }
    }}
    validationSchema = {schema}
    >
      {props => {
        console.log(props)
        return(
          <Form className="pet_form" onSubmit={props.handleSubmit}>

            <Row className="m-0 p-0 justify-content-between">
              <Row className="flex-column mr-5 flex-grow-1">
                  
                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xl="3" xs="4">Type:</Form.Label>
                    <Col xl="9" xs="8">
                      {props.touched.type && props.errors.type && <div>{props.errors.type}</div>}
                      <Form.Control
                        as="select" 
                        name="type"
                        value={props.values.type}
                        onChange={props.handleChange}>
                          <option>---</option>
                          <option>dog</option>
                          <option>cat</option>
                          <option>bird</option>
                          <option>rabbit</option>
                          <option>other</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xl="3" xs="4">Sex:</Form.Label>
                    <Col xl="9" xs="8">
                      {props.touched.sex && props.errors.sex && <div>{props.errors.sex}</div>}
                      <Form.Control
                        as="select" 
                        name="sex"
                        value={props.values.sex}
                        onChange={props.handleChange}>
                          <option>---</option>
                          <option>male</option>
                          <option>female</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xl="3" xs="4">Height:</Form.Label>
                    <Col xl="9" xs="8">
                      {props.touched.height && props.errors.height && <div>{props.errors.height}</div>}
                      <Form.Control
                        as="select" 
                        name="height"
                        value={props.values.height}
                        onChange={props.handleChange}>
                          <option>---</option>
                          <option>5–10 cm</option>
                          <option>10–15 cm</option>
                          <option>15–20 cm</option>
                          <option>20–40 cm</option>
                          <option>40–60 cm</option>
                          <option>60–80 cm</option>
                      </Form.Control>
                    </Col>
                  </Form.Group>
                
                  <Form.Group as={Row} className="m-0 mb-3 p-0">
                    <Form.Label column xl="3" xs="4">Breed:</Form.Label>
                    <Col xl="9" xs="8">
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
                    <Form.Label column xl="3" xs="4">Color:</Form.Label>
                    <Col xl="9" xs="8">
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
                    <Form.Label column xl="3" xs="4">Location:</Form.Label>
                    <Col xl="9" xs="8">
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
                    <Form.Label column xl="3" xs="4">Distinktive features: <p>up to 60 char</p></Form.Label>
                    <Col xl="9" xs="8">
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
                    <Form.Label column xl="3" xs="4">Description: <p>up to 100 char</p></Form.Label>
                    <Col xl="9" xs="8">
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


              <Row className="d-flex flex-column flex-nowrap justify-content-between m-0 ml-auto mr-auto p-0 pt-4 pb-4">
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
                      value={props.values.photo}
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
                      disabled={ props.isSubmitting || !fileUrl }
                      >
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