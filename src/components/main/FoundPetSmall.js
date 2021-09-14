import React from 'react';
import styles from './../../modules.css/animals.module.css';
import Col from 'react-bootstrap/Col';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const FoundPetSmall = ({post}) => {

  return(
    <Col className={styles.item}>
      <div className={styles.content}>
        <p className={styles.pet_name}>{post.type}</p>
        <p className={styles.location}>
          <span><FontAwesomeIcon icon={faMapMarker}/></span>
          {post.location}
        </p>
        <div className={styles.pet_photo} style={{background: `url(${post.photo})`, backgroundSize: 'cover', backgroundPositionX: 'center', backgroundPositionY: 'center'}}></div>
        <NavLink to={`/home/found/${post.postId}`} className={styles.view_details}>
          view details
          <span><FontAwesomeIcon icon={faAngleDoubleRight}/></span>
        </NavLink>
      </div>
    </Col>
  )
}

export default FoundPetSmall;