import React, { useContext } from 'react';
import './styles.css';
import Nav from 'react-bootstrap/Nav';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faBars, faClinicMedical, faDog, faHome, faHotel, faPaw, faSearch, faSignOutAlt, faTimes, faWalking } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../../../context/user/userContext';
import { AuthContext } from '../../../context/auth/authContext';

const NavSmallScreen = () => {
  const uid = localStorage.getItem('LOCAL_ID');
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);


  return(
    <>
    <div className="nav_small">
      <input type="checkbox" />
      <div className="icon_back"></div>
      <div className="nav_bars_icon"><FontAwesomeIcon icon={faBars}  /></div>
      <div className="nav_close_icon"><FontAwesomeIcon icon={faTimes}  /></div>
      <div className="window_top"></div>
      <Nav className="nav_content">
          { uid && 
            <Nav.Item>
              <NavLink aria-current="page" to="/home/posts">
                <span><FontAwesomeIcon icon={faHome}/></span>
                Home
              </NavLink>
            </Nav.Item>
          }

          <Nav.Item>
            <NavLink aria-current="page" to="/home/lost">
              <span><FontAwesomeIcon icon={faSearch}/></span>
              Lost
            </NavLink>
          </Nav.Item>

          <Nav.Item>
            <NavLink aria-current="page" to="/home/found">
              <span><FontAwesomeIcon icon={faPaw}/></span>
              Found
            </NavLink>
          </Nav.Item>

          

          { uid && 
          <>
            <div className="divider"></div>
            <Nav.Item>
              <NavLink aria-current="page" to="/home/hotels">
              <span><FontAwesomeIcon icon={faHotel}/></span>
              Hotels
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink aria-current="page" to="/home/walking">
              <span><FontAwesomeIcon icon={faWalking}/></span>
              Walking
              </NavLink>
            </Nav.Item>

            <Nav.Item>
              <NavLink aria-current="page" to="/home/fostering">
              <span><FontAwesomeIcon icon={faDog}/></span>
              Fostering
              </NavLink>
            </Nav.Item>
            

            <Nav.Item>
              <NavLink aria-current="page" to="/home/vethelp">
              <span><FontAwesomeIcon icon={faClinicMedical}/></span>
              VetHelp
              </NavLink>
            </Nav.Item>

            <div className="divider"></div>

            <Nav.Item>
              <NavLink to={`/home/profile`}>
                {user.avatar ?
                <div className="profile_block">
                  <div className="user_avatar"><img src={user.avatar} alt="user_avatar" /></div>
                  <div className="user_name">{user.name}</div> 
                </div>
                : 
                <>
                <div className="profile_block">
                  <div className="default_avatar">
                    <img src="https://res.cloudinary.com/dt6qtzp2z/image/upload/v1620594073/propets/default_avatar.svg" alt="default_avatar" />
                  </div>
                  <div className="user_name">{user.name}</div> 
                </div>
                </>
                }
              </NavLink>
            </Nav.Item>

            <div className="divider"></div>

            <Nav.Item>
              <NavLink exact to="/" onClick={logout}>
                <span><FontAwesomeIcon icon={faSignOutAlt} /></span>
                Logout
              </NavLink>
            </Nav.Item>
          </>
          }
      </Nav>
    </div>
    </>
  )
}

export default NavSmallScreen;