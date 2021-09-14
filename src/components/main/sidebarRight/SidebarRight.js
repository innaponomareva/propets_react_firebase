import React from 'react';
import './styles.css';
import Col from 'react-bootstrap/Col';
import NavProfile from './NavProfile';
import NavLogout from './NavLogout';


const SidebarRight = ({user}) => {

  return (
    <Col className="sidebar_right" xl="2">
      <NavProfile user={user} />
      <NavLogout />
    </Col>
  )
}

export default SidebarRight;