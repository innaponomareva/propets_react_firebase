import React from "react";
import "../../css/sidebarLeft.css";
import NavTop from "./NavTop";
import NavServices from "./NavServices";

const SidebarLeft = ({ user, width }) => {
  return (
    <nav className="sidebar_left">
      <NavTop width={width} />
      {user && <NavServices width={width} />}
    </nav>
  );
};

export default SidebarLeft;
