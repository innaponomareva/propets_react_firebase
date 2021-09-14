import React from 'react';
import './styles.css';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import Logo from './../../images/Logo.svg';
import Nav from 'react-bootstrap/esm/Nav';
import { NavLink, Route } from 'react-router-dom';
import AuthLoginForm from './AuthLoginForm';
import AuthRegisterForm from './AuthRegisterForm';


const AuthBox = () => {
  return(
    <Row className="m-0">
      <Col className="auth_box" xl={8}>
        <img src={Logo} alt="logo" />
        <p className="welcome_text"><b>Welcome!</b> Please sign in / sign up to continue</p>
        <Nav>
          <NavLink to="/auth/register" className="tab_btn" type="button">Sign up</NavLink>
          <NavLink to="/auth/login" className="tab_btn" type="button">Sign in</NavLink>
        </Nav>

        <Col className="auth_form_container">
          <Route path="/auth/register" component={AuthRegisterForm} />
          <Route path="/auth/login" component={AuthLoginForm} />
        </Col>
      </Col>
    </Row>
  )
}

export default AuthBox;