import React from "react";
import styles from "../css/stage.module.css";
import { NavLink } from "react-router-dom";
import LogoIcon from "./logos/LogoIcon";

const Stage = () => {
  return (
    <section className={styles.stage}>
      <div className={styles.info_box}>
        <p className={styles.slogan}>
          Welcome to your{" "}
          <span className={styles.slogan_green}>pawfessional </span>community
        </p>
        <nav className={styles.nav_btn_container}>
          <NavLink
            to="/lost"
            className={`${styles.nav_btn} ${styles.lost_btn}`}
            data-silent="I lost my pet!"
            data-hover="Click to find!"
          >
            <LogoIcon color={"white"} className={styles.lost_icon} />
            <div className={styles.btn_tail}></div>
          </NavLink>

          <NavLink
            to="/found"
            className={`${styles.nav_btn} ${styles.found_btn}`}
            data-silent="I found a pet!"
            data-hover="What to do?"
          >
            <div className={styles.btn_tail}></div>
          </NavLink>
        </nav>

        <p className={styles.join_text}>
          I just want to{" "}
          <NavLink exact to="/register">
            join
          </NavLink>{" "}
          the pawsome community!
        </p>
      </div>
      <div className={styles.img_box}>
        <img
          src="https://res.cloudinary.com/dt6qtzp2z/image/upload/v1619999559/propets/white_puppy.jpg"
          alt="whitePuppy"
        />
      </div>
    </section>
  );
};

export default Stage;
