import React from 'react';
import styles from '../../modules.css/header.module.css';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import WhitePuppy from './../../images/whitePuppy.jpg';
import LostIcon from '../../images/lost-icon.svg'

const Header = () => {
  return(
    <header className={styles.header}>
      <Container>
        <Row className="flex-nowrap">
          <Col xl={6} className="p-0">
            <p className={styles.header_slogan}>Welcome to your <span>pawfessional</span> community</p>
            <Nav className={styles.header_nav}>
              <NavLink to="/home/lost" className={`${styles.header_btn} ${styles.lost_btn}`}
                data-silent="I lost my pet!"
                data-hover="Click to find!">
                <img src={LostIcon} alt="lost-icon" className={styles.lost_icon} />
                <div className={styles.btn_tail}></div>
              </NavLink>
              <NavLink to="/home/found" className={`${styles.header_btn} ${styles.found_btn}`}
                data-silent="I found a pet!"
                data-hover="What to do?">
              <div className={styles.btn_tail}></div>
              </NavLink>
            </Nav>
            <p className={styles.join_text}>I’m okay, just want to <NavLink to="/auth/register">join</NavLink> the pawsome community!</p>
          </Col>
          <Col xl={6}><img className={styles.header_img} src={WhitePuppy} alt="whitePuppy" /></Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header;