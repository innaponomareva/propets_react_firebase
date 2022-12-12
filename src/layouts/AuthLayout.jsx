import React from "react";
import "../css/authStyles.css";
import Logo from "../components/logos/Logo";
import { NavLink } from "react-router-dom";

const AuthLayout = ({ children }) => {
  return (
    <div className="outer-container">
      <nav className="auth_box">
        <NavLink to="/">
          <Logo className={"propet_logo"} color={"#1cb1ba"} />
        </NavLink>
        <p className="welcome_text">
          <b>Welcome!</b> Please sign in / sign up to continue
        </p>
        <div className="tabs_box">
          <NavLink to="/register" className="tab" type="button">
            Sign up
          </NavLink>
          <NavLink to="/login" className="tab" type="button">
            Sign in
          </NavLink>
        </div>

        <div className="auth_form_container">{children}</div>
      </nav>
    </div>
  );
};

export default AuthLayout;
