import React, { useContext, useEffect } from 'react';
import styles from './../../modules.css/animals.module.css';
import Row from 'react-bootstrap/Row';
import { NavLink } from 'react-router-dom';
import { FoundContext } from '../../context/found/foundContext';
import Loader from '../loader/Loader';
import FoundPetSmall from './FoundPetSmall';


const FoundAnimals = () => {
  const uid = localStorage.getItem('LOCAL_ID');
  const { getAllFound, found, loading } = useContext(FoundContext);


  useEffect(() => {
    if(found.length === 0){
      getAllFound();
    }
}, [getAllFound, found.length]);


  return(
    <>
      { loading && <Loader /> }
      { found.length > 0 ?
        <>
          <div className={styles.title}>Found pets</div>
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
            {found.map((item, index) => <FoundPetSmall key={index} post={item} />)}
          </Row>
        </>
       : <div>No found pets...</div>}
    </>
  )
}

export default FoundAnimals;