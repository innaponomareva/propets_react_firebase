import React, { useEffect, useState } from 'react';
import './styles.css';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faPaw, faSearch} from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';


const NavTop = () => {
  const uid = localStorage.getItem('LOCAL_ID');
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return (
    <Nav className="nav_top flex-column">
      {uid && 
            <Nav.Item>
            <NavLink className="nav-link" aria-current="page" to="/home/posts">
              <span><FontAwesomeIcon icon={faHome}/></span>
              {width >= 1200 && 'Home'}
            </NavLink>
            <div className="back_active"></div>
          </Nav.Item>
      }

      <Nav.Item>
        <NavLink className="nav-link" aria-current="page" to="/home/lost">
          <span><FontAwesomeIcon icon={faSearch}/></span>
          {width >= 1200 && 'Lost'}
        </NavLink>
        <div className="back_active"></div>
      </Nav.Item>

      <Nav.Item>
        <NavLink className="nav-link" to="/home/found">
          <span><FontAwesomeIcon icon={faPaw}/></span>
          {width >= 1200 && 'Found'}
        </NavLink>
        <div className="back_active"></div>
      </Nav.Item>
    </Nav>
  )
}

export default NavTop;