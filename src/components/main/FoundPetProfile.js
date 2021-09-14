import React, { useContext, useEffect } from 'react';
import styles from './../../modules.css/petProfile.module.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faEnvelopeSquare, faMapMarker, faPhoneSquare } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router';
import { UserContext } from '../../context/user/userContext';
import moment from 'moment';
import { FoundContext } from '../../context/found/foundContext';


const FoundPetProfile = () => {
  const { found, getAllFound, loading } = useContext(FoundContext);
  const { users, getAllUsers } = useContext(UserContext);
  const { id } = useParams();
  const postIndex = found.findIndex(item => item.postId === id);
  const post = found[postIndex];

  const userIndex = users.findIndex(item => item.uid === post.uid);
  const user = users[userIndex];


  useEffect(()=>{
    if(found.length === 0){
      getAllFound();
    }
  },[getAllFound, found])

  useEffect(()=>{
    if(users.length === 0){
      getAllUsers();
    }
  },[getAllUsers, users])

  return(
    <>
    {!loading && found.length > 0 && users.length > 0 ? 
      <Col className={styles.pet_profile}>
      <div className={styles.title}>
        Found pet:
        <span className={styles.nick}>{post.type}</span>
        <span className={styles.map_icon}><FontAwesomeIcon icon={faMapMarker}/></span>
        <span className={styles.location}>{post.location}</span>
      </div>
      <div className={styles.divider}></div>
      <Row className={styles.wrapper}>
        <Col className={styles.photo}>
          <img src={post.photo} alt="pet_img" />
        </Col>
        <Col className={styles.info}>
          <div className={styles.pet_type}>{post.breed}</div>
          <div className={styles.date}>{moment(post.created * 1000).format('LL')}</div>
          <div className={styles.grey_divider}></div>

          <div className={styles.details}>
            <div><span>Color:</span>{post.color}</div>
            <div><span>Sex:</span>{post.sex}</div>
            <div><span>Height:</span>{post.height}</div>
          </div>

          <div className={styles.details}>
            <div><span>Distinctive features:</span>{post.features}</div>
          </div>
        </Col>
      </Row>

      <div className={styles.details}>
          <div><span>Description:</span>
          {post.description}
          </div>
      </div>
      <div className={styles.details}>
        <div><span>Owner:</span>{user.name}</div>
        <div className={styles.phone_icon}>
          <span ><FontAwesomeIcon icon={faPhoneSquare} /></span>
          {post.phone}
        </div>
        <div className={styles.mail_icon}>
          <span ><FontAwesomeIcon icon={faEnvelopeSquare} /></span>
          {post.email}
        </div>
      </div>
    </Col>
    : <></>
    }
    </>
    
  )
}

export default FoundPetProfile;