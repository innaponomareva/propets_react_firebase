import React from 'react';
import Container from 'react-bootstrap/Container';
import AuthBox from '../components/auth/AuthBox';


const Auth = () => {
  
  return(
    <div className="outer_container">
      <Container fluid>
        <AuthBox/>
      </Container>
    </div>
  )
}

export default Auth;