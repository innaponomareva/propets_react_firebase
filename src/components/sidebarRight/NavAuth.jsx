import React, { useContext } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { UserContext } from "../../context/user/userContext";
import NavButton from "../buttons/NavButton";

const NavAuth = ({ width, user }) => {
  const { logout } = useContext(UserContext);

  return (
    <div className="nav_auth">
      {!user && <div className="nav_divider" />}
      <NavButton
        path={user ? "/" : "/login"}
        label={
          user && width > 1520
            ? "Logout"
            : !user && width > 1520
            ? "Login"
            : null
        }
        icon={user ? <FiLogOut /> : <FiLogIn />}
        onClick={user ? logout : null}
      />
    </div>
  );
};

export default NavAuth;
