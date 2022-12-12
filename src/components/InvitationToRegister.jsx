import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../css/invitationToRegister.module.css";

const InvitationToRegister = ({ title }) => (
  <div className={styles.invitation}>
    {title}
    <NavLink to="/register">join</NavLink>
    our community
  </div>
);

export default InvitationToRegister;
