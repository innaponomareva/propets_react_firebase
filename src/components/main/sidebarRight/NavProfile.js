import React, { useContext, useEffect, useState } from 'react';
import './styles.css';
import {NavLink} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { UserContext } from '../../../context/user/userContext';



const NavProfile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const { user } = useContext(UserContext);



  useEffect(() => {
    function handleResize() {setWidth(window.innerWidth)}
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  return(
    <Nav className="nav_profile flex-column">
      <div className="divider" />
      <Nav.Item>
        <NavLink className="nav-link" to={`/home/profile`}>
          {user.avatar ? 
          <div className="nav_avatar"><img src={user.avatar} alt="user_avatar" /></div> 
          : 
          <div className="nav_avatar"><img src="https://res.cloudinary.com/dt6qtzp2z/image/upload/v1620594073/propets/default_avatar.svg" alt="default_avatar" /></div> 
          }
          {width >= 1520 && <div className="user_name">{user.name}</div>}
        </NavLink>
      </Nav.Item>
      <div className="divider" />
    </Nav>
  )
}

export default NavProfile;