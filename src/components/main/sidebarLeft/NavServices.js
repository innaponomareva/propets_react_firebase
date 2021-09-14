import React, { useEffect, useState } from 'react';
import './styles.css';
import {NavLink} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faClinicMedical, faDog, faHotel, faWalking } from '@fortawesome/free-solid-svg-icons';
import Nav from 'react-bootstrap/Nav';

const NavServices = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {setWidth(window.innerWidth)}
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return(
      <Nav className="nav_services flex-column">
        <Nav.Item className="nav_title">
          {width >= 1200 ? 'Services': '' }
        </Nav.Item>

          <div className="divider"></div>

        <Nav.Item>
          <NavLink className="nav-link" aria-current="page" to="/home/hotels">
            <span><FontAwesomeIcon icon={faHotel}/></span>
            {width >= 1200 && 'Hotels'}
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link walking" aria-current="page" to="/home/walking">
            <span><FontAwesomeIcon icon={faWalking}/></span>
            {width >= 1200 && 'Walking'}
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" aria-current="page" to="/home/fostering">
            <span><FontAwesomeIcon icon={faDog}/></span>
            {width >= 1200 && 'Fostering'}
          </NavLink>
        </Nav.Item>

        <Nav.Item>
          <NavLink className="nav-link" aria-current="page" to="/home/vethelp">
            <span><FontAwesomeIcon icon={faClinicMedical}/></span>
            {width >= 1200 && 'VetHelp'}
          </NavLink>
        </Nav.Item>

        <div className="divider"></div>
      </Nav>
  )
}

export default NavServices;