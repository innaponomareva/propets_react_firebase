import React, { useState, useContext, useEffect } from 'react';
import './styles.css';
import { NavLink} from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaw,} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../context/auth/authContext';



const AuthRegisterForm = (props) => {
  const {registration, authSuccess, user} = useContext(AuthContext);
  const [state, setState] = useState({name:'', email:'', password:'', confirm: ''});
  const {name, email, password} = state;

  const onSubmitHandler = (event) => {
    event.preventDefault();
    registration(name, email, password);
    setState({name:'', email:'', password:'', confirm:''});
  }

  useEffect(()=>{
    if(authSuccess){
      props.history.push('/home/posts');
    }
  },[authSuccess, props]);


  return(
    <Form>
      <Row className="m-0">
        <Col className="form_row_item">
          <Form.Group as={Row} controlId="name">
            <Form.Label column sm="3">
              Name:
            </Form.Label>
            <Col sm="9">
              <Form.Control 
                type="text"
                placeholder="Firstname Surname"
                value={state.name}
                onChange={event => setState({...state, name: event.target.value})}
                 />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="email">
            <Form.Label column sm="3">
              Email:
            </Form.Label>
            <Col sm="9">
              <Form.Control 
                type="email"
                placeholder="your-email@mail.com"
                value={state.email}
                onChange={event => setState({...state, email: event.target.value})}
                 />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="password">
            <Form.Label column sm="3">
              Password:
              </Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="password" 
                  placeholder="password"
                  value={state.password}
                  onChange={event => setState({...state, password: event.target.value})}
                   />
              </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="confirm_password">
            <Form.Label column sm="3">
              Password:
              </Form.Label>
              <Col sm="9">
                <Form.Control 
                  type="password"
                  placeholder="confirm password"
                  value={state.confirm}
                  onChange={event => setState({...state, confirm: event.target.value})}
                   />
              </Col>
          </Form.Group>
        </Col>

        <Col className="m-0 d-flex flex-column">
          <Col className="empty"></Col>
          <Col className="empty"></Col>
          <Col className="help_text_small m-0">Password must have at least 8 characters with at least one Capital letter, at least one lower case letter and at least one number or special character.</Col>
          <Col className="empty"></Col>
        </Col>
        
      </Row>

      <div className="auth_form_divider"></div>
      <Row className="m-0">
        <Col className="form_row_item">
          <p className="help_text">By clicking “Submit”, you agree to us processing your information in accordance with <span className="underline">these terms</span>.</p>
        </Col>
        <Col className="form_row_item btns_container">
          <NavLink exact to="/" type="button" className="btn cancel_btn">Cancel</NavLink>
          <button  
            type="submit" 
            className="btn submit_btn"
            onClick={onSubmitHandler}
            >
            <span><FontAwesomeIcon icon={faPaw}/></span>
            Submit
          </button>
        </Col>
      </Row>
    </Form>
  )
}

export default AuthRegisterForm;