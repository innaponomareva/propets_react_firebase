import React from "react";
import { NavLink } from "react-router-dom";
import "../../css/navButton.css";
import clsx from "clsx";

// type --> default | specialRight | specialLeft

const NavButton = ({ type = "default", path, label, icon, onClick }) => (
  <div
    className={clsx(
      "nav_item",
      type === "specialRight" && "nav_item_special_right",
      type === "specialLeft" && "nav_item_special_left"
    )}
  >
    <NavLink
      exact
      to={path}
      aria-current="page"
      type="button"
      className={clsx(
        "navlink",
        type === "default" && "navlink_default",
        (type === "specialRight" || type === "specialLeft") && "navlink_special"
      )}
      onClick={onClick}
    >
      {icon && <div className="navlink_icon">{icon}</div>}
      {label && <p>{label}</p>}
    </NavLink>
    {type !== "default" && (
      <div
        className={clsx(
          "back_active",
          type === "specialLeft" && "back_active_left",
          type === "specialRight" && "back_active_right"
        )}
      ></div>
    )}
  </div>
);

export default NavButton;
