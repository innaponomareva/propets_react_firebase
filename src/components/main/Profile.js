import React, { useState, useContext, useEffect } from 'react';
import styles from '../../modules.css/profile.module.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../../context/user/userContext';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPencilAlt, faSave} from '@fortawesome/free-solid-svg-icons';
import { FaRegUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import Loader from '../loader/Loader';


const Profile = () => {
  const {updateUser, getUser} = useContext(UserContext);
  const uid = localStorage.getItem('LOCAL_ID');
  const history = useHistory();
  
  const useRemote = () => {
    const [value, setValue] = useState({});
    useEffect(() => {
      async function fetchRemote(){
        try{
          const response = await getUser(uid);
          setValue(response);
        }catch(error){
          console.log(error)
        }
      }
      fetchRemote()
      
    }, []);
    return [value, setValue];
  }

 
  const [state, setState] = useRemote();
  const {name, email, phone, avatar, myPet, nick, photo} = state;


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try{
      await updateUser(uid, state);
      await getUser(uid)
      history.push('/home/posts');
    }catch(error){
      console.log(error)
    }
  }
  const onEditHandler = () => {
    document.querySelector('#name').removeAttribute('disabled')
    document.querySelector('#name').focus()
  }

  return(
    <>
      <div className={styles.profile_form_title}>Your profile. Change, edit and manage your data.</div>
      <div className={styles.profile_divider}></div>
      <div className={styles.profile_form_subtitle}>My profile</div>
      { name ? 
      <>
      <Form className={styles.profile_form}>
        <Form.Group as={Row} className={styles.profile_avatar_name_section}>

            { avatar.includes('https') ? 
              <Col xs="auto" className={styles.profile_user_img}><img src={avatar} alt="user_img" /></Col>
            : 
              <Col xs="auto" className={styles.profile_user_img}><FaRegUserCircle className={styles.default_img} /></Col>
            } 

            <Col className="name_section">
              <FontAwesomeIcon icon={faPencilAlt} className={styles.edit_img} onClick={onEditHandler} />
              <Form.Control 
                type="text"
                id="name"
                value={name}
                disabled
                onChange={event => setState({...state, name: event.target.value})}
                />
            </Col>
          </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xl="1" xs="2">
            Email:
          </Form.Label>
          <Col xl="11" xs="10">
            <Form.Control 
              type="email"
              id="email"
              placeholder="name@mail.com"
              value={email}
              onChange={event => setState({...state, email: event.target.value})}
              />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xl="1" xs="2">
            Phone:
          </Form.Label>
          <Col xl="11" xs="10">
            <Form.Control 
              type="text"
              id="phone"
              placeholder="000-000-00-00"
              value={phone}
              onChange={event => setState({...state, phone: event.target.value})}
              />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column xl="1" xs="2">
            Avatar:
          </Form.Label>
          <Col xl="11" xs="10">
            <Form.Control 
              type="text"
              id="avatar"
              placeholder="url"
              value={avatar}
              onChange={event => setState({...state, avatar: event.target.value})}
              />
          </Col>
        </Form.Group>

        <div className={styles.my_pet_section}>
          <Form.Group as={Row}>
            <Form.Label column xl="1" xs="2">
              My Pet:
            </Form.Label>
            <Col xl="8" xs="5">
              <Form.Control 
                type="text"
                id="myPet"
                placeholder="pet type"
                value={myPet}
                onChange={event => setState({...state, myPet: event.target.value})}
                />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xl="1" sm="2">
              Nick:
            </Form.Label>
            <Col xl="8" xs="5">
              <Form.Control 
                type="text"
                id="nick"
                placeholder="pet's nickname"
                value={nick}
                onChange={event => setState({...state, nick: event.target.value})}
                />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column xl="1" sm="2">
              Photo:
            </Form.Label>
            <Col xl="8" sm="5">
              <Form.Control 
                type="text"
                id="photo"
                placeholder="pet's photo"
                value={photo}
                onChange={event => setState({...state, photo: event.target.value})}
                />
            </Col>
          </Form.Group>
          <div className={styles.photo_box}>
            {photo !== '' && <img className={styles.photo} src={photo} alt="pet_photo" />}
            {photo === '' && <p className={styles.default_line}>Your pet photo</p>}
          </div>

        </div>

        <div className="btns_container m-0">
          <button type="submit" className="btn submit_btn" onClick={onSubmitHandler}>
            <span><FontAwesomeIcon icon={faSave}/></span>
            Save
          </button>
        </div>

      </Form>
      </>
      : <Loader />
      }
    </>
  )

}

export default Profile;