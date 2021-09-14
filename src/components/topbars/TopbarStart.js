import React from 'react';
import styles from '../../modules.css/topbars.module.css';
import LogoWhite from '../../images/Logo_white.svg';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { NavLink } from 'react-router-dom';

const TopbarTeal = () => (
    <div className={`${styles.topbar} ${styles.topbar_teal}`}>
      <Container fluid className="d-flex flex-nowrap justify-content-center">
          <Col className="p-0"><img className={styles.topbar_logo} src={LogoWhite} alt="logo" /></Col>
          <Col className={styles.btn_box} xs="auto"><NavLink to="/auth/login" className={`${styles.topbar_btn} ${styles.login_btn}`}>Sign in</NavLink></Col>
      </Container>
    </div>
)

export default TopbarTeal;