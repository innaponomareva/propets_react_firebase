import React from "react";
import "../../css/sidebarRight.css";
import NavProfile from "./NavProfile";
import NavAuth from "./NavAuth";

const SidebarRight = ({ width, user }) => {
  return (
    <nav className="sidebar_right">
      {user && <NavProfile width={width} user={user} />}
      <NavAuth width={width} user={user} />
    </nav>
  );
};

export default SidebarRight;
