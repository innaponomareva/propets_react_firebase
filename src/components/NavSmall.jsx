import React, { useContext, useState } from "react";
import styles from "../css/navSmallScreen.module.css";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import clsx from "clsx";
import {
  FaBars,
  FaClinicMedical,
  FaDog,
  FaHome,
  FaHotel,
  FaPaw,
  FaSearch,
  FaTimes,
  FaWalking,
} from "react-icons/fa";
import { UserContext } from "../context/user/userContext";
import NavButton from "./buttons/NavButton";
import AvatarCard from "./AvatarCard";

const NavSmall = ({ user, color = "green" }) => {
  const { logout } = useContext(UserContext);
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav_small}>
      <FaBars
        className={clsx(
          styles.nav_burger_icon,
          color === "white" && styles.nav_burger_white,
          color === "green" && styles.nav_burger_green
        )}
        onClick={() => setOpen(true)}
      />

      <div
        className={clsx(
          styles.window_top,
          open ? styles.window_top_open : styles.window_top_closed
        )}
      ></div>

      <div
        className={clsx(
          styles.nav_content,
          open ? styles.nav_content_open : styles.nav_content_closed
        )}
      >
        <FaTimes
          className={styles.nav_close_icon}
          onClick={() => setOpen(false)}
        />

        <div className={styles.divider}></div>

        <NavButton path="/posts" label="Posts" icon={<FaHome />} />
        <NavButton path="/lost" label="Lost" icon={<FaSearch />} />
        <NavButton path="/found" label="Found" icon={<FaPaw />} />

        {user && (
          <>
            <div className={styles.divider}></div>
            <NavButton path="/hotels" label="Hotels" icon={<FaHotel />} />
            <NavButton path="/walking" label="Walking" icon={<FaWalking />} />
            <NavButton path="/fostering" label="Fostering" icon={<FaDog />} />
            <NavButton
              path="/vethelp"
              label="VetHelp"
              icon={<FaClinicMedical />}
            />
            <div className={styles.divider}></div>

            <AvatarCard
              type="owner"
              path="/profile"
              photo={user && user.avatar && user.avatar}
              name={"My profile"}
              nav
            />
          </>
        )}
        <div className={styles.divider}></div>

        <NavButton
          path="/login"
          label={user ? "Logout" : "Login"}
          icon={user ? <FiLogOut /> : <FiLogIn />}
          onClick={user ? logout : null}
        />
      </div>
    </nav>
  );
};

export default NavSmall;
