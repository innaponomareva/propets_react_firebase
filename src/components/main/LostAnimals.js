import React, { useContext, useEffect } from 'react';
import styles from './../../modules.css/animals.module.css';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { LostContext } from '../../context/lost/lostContext';
import Loader from '../loader/Loader';
import LostPetSmall from './LostPetSmall';


const LostAnimals = () => {
  const uid = localStorage.getItem('LOCAL_ID');
  const { getAllLost, lost, loading } = useContext(LostContext);

  useEffect(() => {
    if(lost.length === 0){
      getAllLost();
    }
}, [getAllLost, lost.length]);

  return(
    <>
      { loading && <Loader /> }
      { lost.length > 0 ?
        <>
          <div className={styles.title}>Lost pets</div>
          { !uid && <div className={styles.divider}></div> }
          { uid && <div className={styles.divider} style={{marginBottom:'50px'}}></div> }
          

          { !uid && 
            <div className={styles.invitation}>
            Would you like to publish a post?
            <NavLink to="/auth/register">join</NavLink> 
            to our community
          </div>
          }
      
          <Row className={styles.wrapper}>
            {lost.map((item, index) => <LostPetSmall key={index} post={item} />)}
          </Row>
        </>
       : <div>Juhu!!! Nobody is lost!</div>}
    </>
  )
}

export default LostAnimals;