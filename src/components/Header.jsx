import React from "react";
import styles from "../css/header.module.css";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./logos/Logo";
import { FaPlus, FaPaw, FaSearch } from "react-icons/fa";
import NavSmall from "./NavSmall";
import Button from "./buttons/Button";

// type ---> start | main

const Header = ({ type = "start", width, user }) => {
  const location = useLocation();

  return (
    <header
      className={`${styles.header} ${type === "start" && styles.header_start} ${
        type === "main" && styles.header_main
      }`}
    >
      <nav>
        <NavLink to="/">
          <Logo
            className={styles.header_logo}
            color={type === "main" ? "#1cb1ba" : "#ffffff"}
          />
        </NavLink>

        <div className={styles.header_right_side}>
          <div className={styles.header_btn_box}>
            <>
              {type === "main" && user && (
                <>
                  {location.pathname === "/lost" ||
                  location.pathname === "/found" ? (
                    <Button
                      type="link"
                      path="/addlost"
                      label={width > 900 && "I lost my pet"}
                      icon={<FaSearch />}
                      fillRed
                    />
                  ) : (
                    <></>
                  )}

                  {location.pathname.includes("/posts") && (
                    <Button
                      type="link"
                      path="/addpost"
                      label={width > 900 && "Add post"}
                      icon={<FaPlus />}
                      fillGreen
                    />
                  )}

                  {location.pathname === "/lost" ||
                  location.pathname === "/found" ? (
                    <Button
                      type="link"
                      path="/addfound"
                      label={width > 900 && "I found a pet"}
                      icon={<FaPaw />}
                      fillGreen
                    />
                  ) : (
                    <></>
                  )}
                </>
              )}
            </>
          </div>
          {type === "main" && width < 900 && (
            <NavSmall
              user={user}
              color={type === "start" ? "white" : "green"}
            />
          )}
          {type === "start" && (
            <NavSmall
              user={user}
              color={type === "start" ? "white" : "green"}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
