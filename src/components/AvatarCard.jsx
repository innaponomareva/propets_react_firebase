import React from "react";
import styles from "../css/avatarCard.module.css";
import { FaPaw, FaUserCircle } from "react-icons/fa";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

// type --> 'owner' | 'pet'

const AvatarCard = ({ path, type, photo, large, name, date, nav }) => (
  <NavLink
    to={path ? path : "#"}
    className={clsx(styles.avatar_card, nav && styles.avatar_card_nav)}
  >
    <div className={styles.avatar_card_img_box}>
      <div
        className={clsx(
          styles.avatar_card_img,
          nav && styles.avatar_card_img_nav,
          large ? styles.card_large : styles.card_small
        )}
      >
        {photo && <img src={photo} alt="author_img" />}
        {!photo && type === "owner" && (
          <FaUserCircle
            className={clsx(
              nav ? styles.avatar_card_svg_white : styles.avatar_card_svg,
              large ? styles.svg_large : styles.svg_small
            )}
          />
        )}
        {!photo && type === "pet" && (
          <FaPaw
            className={clsx(
              nav ? styles.avatar_card_svg_nav : styles.avatar_card_svg,
              large ? styles.svg_large : styles.svg_small
            )}
          />
        )}
      </div>
    </div>

    <div>
      {name && (
        <div
          className={clsx(
            styles.avatar_card_name,
            nav && styles.avatar_card_name_nav
          )}
        >
          {name}
        </div>
      )}

      {date && (
        <div className={styles.avatar_card_date}>
          {date.day} | {date.time}
        </div>
      )}
    </div>
  </NavLink>
);

export default AvatarCard;
