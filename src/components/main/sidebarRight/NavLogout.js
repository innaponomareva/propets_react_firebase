import React, { useEffect, useState, useContext } from 'react';
import './styles.css';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';
import { AuthContext } from '../../../context/auth/authContext';

const NavLogout = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    function handleResize() {setWidth(window.innerWidth)}
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return(
    <Nav className="nav_logout flex-column">
      <Nav.Item>
        <NavLink 
          className="nav-link"
          to="/"
          onClick={logout}
          >
          <span><FontAwesomeIcon icon={faSignOutAlt} /></span>{width >= 1520 ? 'Logout': '' }
        </NavLink>
      </Nav.Item>
    </Nav>
  )
}

export default NavLogout;