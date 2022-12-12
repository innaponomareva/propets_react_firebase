import React from "react";
import AvatarCard from "../AvatarCard";

const NavProfile = ({ user, width }) => {
  return (
    <div className="nav_profile">
      <div className="nav_divider" />
      <AvatarCard
        type="owner"
        path="/profile"
        photo={user && user.avatar && user.avatar}
        name={width > 1520 && "My profile"}
        nav
      />
      <div className="nav_divider" />
    </div>
  );
};

export default NavProfile;
