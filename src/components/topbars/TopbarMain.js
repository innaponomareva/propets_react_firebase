import React, { useEffect, useState } from 'react';
import styles from '../../modules.css/topbars.module.css';
import Logo from '../../images/Logo.svg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { NavLink, withRouter } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaw, faPlus, faSearch,} from '@fortawesome/free-solid-svg-icons';

const TopbarMain = ({location}) => {
  const uid = localStorage.getItem('LOCAL_ID');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return(
    <div className={`${styles.topbar} ${styles.topbar_white}`}>
      <Container fluid className="d-flex flex-nowrap justify-content-center">
        <Col className="p-0"><NavLink to="/"><img className={styles.topbar_logo} src={Logo} alt="logo" /></NavLink></Col>

          {uid && 

          <Col className={styles.btn_box} xs="auto">
            { location.pathname === '/home/lost' || location.pathname === '/home/found' ?
            <NavLink to="/home/addlost" className={`${styles.topbar_btn} ${styles.lost_btn}`}>
              {width >= 900 && <span><FontAwesomeIcon icon={faSearch}/></span>}
              {width <= 900 && <span style={{margin:'0 auto'}}><FontAwesomeIcon icon={faSearch}/></span>}
              {width >= 900 && 'I lost my pet'}
            </NavLink> : <></>}

            { location.pathname.includes('/home/posts') && 
            <NavLink to="/home/addpost" className={`${styles.topbar_btn} ${styles.addpost_btn}`}>
              {width >= 700 && <span><FontAwesomeIcon icon={faPlus}/></span>}
              {width <= 700 && <span style={{margin:'0 auto'}}><FontAwesomeIcon icon={faPlus}/></span>}
              {width >= 700 && 'Add post'}
            </NavLink>}

            { location.pathname === '/home/lost' || location.pathname === '/home/found' ?
              <NavLink to="/home/addfound" className={`${styles.topbar_btn} ${styles.found_btn}`}>
                {width >= 900 && <span><FontAwesomeIcon icon={faPaw}/></span>}
                {width <= 900 && <span style={{margin:'0 auto'}}><FontAwesomeIcon icon={faPaw}/></span>}
                {width >= 900 && 'I found a pet'}
              </NavLink> : <></>}
          </Col>
          
          }
      </Container>
    </div>
)
}

export default withRouter(TopbarMain);