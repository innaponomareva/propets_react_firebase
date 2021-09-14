import React from 'react';
import './styles.css';
import Col from 'react-bootstrap/Col';
import NavTop from './NavTop'
import NavServices from './NavServices';


const SidebarLeft = () => {
  const uid = localStorage.getItem('LOCAL_ID');


  return (
    <Col className="sidebar_left" xl="2">
        <NavTop />
        {uid && <NavServices />} 
    </Col>
  )
}

export default SidebarLeft;