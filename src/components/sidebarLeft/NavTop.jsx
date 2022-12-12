import React from "react";
import { FaHome, FaPaw, FaSearch } from "react-icons/fa";
import NavButton from "../buttons/NavButton";

const NavTop = ({ width }) => {
  return (
    <div className="nav_top">
      <div className="nav_divider" />
      <NavButton
        path="/posts"
        label={width > 1520 && "Posts"}
        icon={<FaHome />}
        type="specialLeft"
      />
      <NavButton
        path="/lost"
        label={width > 1520 && "Lost"}
        icon={<FaSearch />}
        type="specialLeft"
      />
      <NavButton
        path="/found"
        label={width > 1520 && "Found"}
        icon={<FaPaw />}
        type="specialLeft"
      />
      <div className="nav_divider" />
    </div>
  );
};

export default NavTop;
